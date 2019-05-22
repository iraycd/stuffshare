/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import LOGIN_ACTIONS from './actions.js';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import { geolocated } from 'react-geolocated';
import 'leaflet/dist/leaflet.css';
import Autocomplete from 'react-autocomplete'
import SET_LATLNG_ACTIONS from './actions.js';
import CommandList from '../../../../../../Shared/CommandList.js';

//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class SetLatlng extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            zoom: 16,
            countryValue: '',
            regionValue: '',
            cityValue: ''
        }

        this.step = 1;
        this.state.validation = [];
        this.state.setLonLat = false;
        this.timeout = null;

    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                this.validation();
            });
        }
    }


    componentDidMount() {
        this.props.getCountries();
        if (this.props.auth.user && this.props.auth.user.longitude != 0 && this.props.auth.user.latitude != 0) {
            this.setState({
                longitude: this.props.auth.user.longitude,
                latitude: this.props.auth.user.latitude
            });
            return
        } else {
            this.props.setNotification(Enums.CODE.INFO_GLOBAL,
                Translator(this.props.codeDict.data.INFO_GLOBAL, this.props.lang).translate('SET_LANG_REQUIRE_INFO')
            );


            if (this.props.coords && this.longitude == 0 && this.latitude == 0) {

                this.setState({
                    longitude: this.props.coords.longitude,
                    latitude: this.props.coords.latitude
                });

            } else {
                this.setState({
                    longitude: 0,
                    latitude: 0
                });
            }
        }
    }
    countryHander(event) {
        this.setState({
            countryValue: event.target.value,
            regionValue: '',
            cityValue: '',
            regionId: '',
            cityId: '',
        });
        let name = event.target.value

        clearTimeout(this.timeout ? this.timeout : 0);
        if (name.length > 2) {
            this.timeout = setTimeout(() => {
                console.log('request');
                this.props.getCountries({ name: name });
            }, 500)
        }
    }

    regionHander(event) {
        this.setState({
            regionValue: event.target.value,
            cityValue: '',
            cityId: '',
        });
        let name = event.target.value

        clearTimeout(this.timeout ? this.timeout : 0);
        if (name.length > 2) {
            this.timeout = setTimeout(() => {
                console.log('request');
                this.props.getCities({ country_id: this.state.countryId, name: name });
            }, 500)
        }
    }
    /*
    regionSelect(val) {
        this.props.latlng.regions.forEach(item => {
            console.log(val);

            if (item.name == val) {

                console.log(val);
                this.setState({
                    regionValue: val,
                    regionId: item.id,
                    setLonLat: true,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    zoom: 6,
                    cityValue: '',
                    cityId: '',
                });
                this.props.getCities({ name: '', region_id: item.id })
            }
        })

        //this.props.getCountries({name:event.target.value});
    }*/


    cityHander(event) {
        this.setState({
            cityValue: event.target.value
        });
        let name = event.target.value

        clearTimeout(this.timeout ? this.timeout : 0);
        if (name.length > 2) {
            this.timeout = setTimeout(() => {
                console.log('request');
                this.props.getCities({ country_id: this.state.countryId, name: name });
            }, 500)
        }
    }
    citySelect(val) {
        this.props.latlng.cities.forEach(item => {
            console.log(val);

            if (item.name == val) {

                this.setState({
                    cityValue: val,
                    cityId: item.id,
                    setLonLat: true,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    zoom: 9
                });

            }
        })

        //this.props.getCountries({name:event.target.value});
    }
    countrySelect(val) {
        this.props.latlng.countries.forEach(item => {
            console.log(val);

            if (item.name == val) {

                console.log(val);
                this.setState({
                    countryValue: val,
                    countryId: item.id,
                    setLonLat: true,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    regionValue: '',
                    regionId: '',
                    cityValue: '',
                    cityId: '',
                    zoom: 3
                });
              //   this.props.getCities({ country_id: item.id, name: name });
                return
            }
        })

        //this.props.getCountries({name:event.target.value});
    }

    onZoom(event) {

        this.setState({
            zoom: this.map.viewport.zoom
        })
    }
    addMarker(event) {

        this.setState({
            longitude: event.latlng.lng,
            latitude: event.latlng.lat,
            setLonLat: true,
        })
    }
    submitHandler(event) {
        if (this.props.coords && this.state.longitude == 0 && this.state.latitude == 0) {
            this.state.longitude = this.props.coords.longitude,
                this.state.latitude = this.props.coords.latitude

        }
        this.props.setLatLng(this.state).then(succ=>{
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('SET_LANG_SAVE_SUCCESS')
            );
        })

    }
    refreshGeolocation(event) {
        this.setState({
            longitude: this.props.coords.longitude,
            latitude: this.props.coords.latitude
        });

    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        this.refreshValidation();
        let latlng = [0, 0];
        if (this.props.coords) {
            if (this.state.setLonLat == 1) {
                latlng = [this.state.latitude, this.state.longitude];
            } else if (this.state.latitude != 0 && this.state.longitude != 0) {
                latlng = [this.state.latitude, this.state.longitude];
            } else {
                latlng = [this.props.coords.latitude, this.props.coords.longitude];
            }
        } else if (this.state.latitude && this.state.longitude) {
            latlng = [this.state.latitude, this.state.longitude]
        }
        console.log(latlng);
        //let latlng = this.props.coords ? this.state.setLonLat == 1 ? [this.state.latitude, this.state.longitude] : [this.props.coords.latitude, this.props.coords.longitude] : [this.state.latitude, this.state.longitude]
        let map = <Map className="size-map-300px" center={latlng} zoom={this.state.zoom} onzoomend={this.onZoom.bind(this)} onClick={this.addMarker.bind(this)}
            ref={(ref) => { this.map = ref; }}

        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
                <Marker position={latlng}>
                    <Popup><Row>A pretty CSS3 popup. <br /> Easily customizable.</Row>
                    </Popup>
                </Marker>

            </MarkerClusterGroup>
        </Map>

        let value = "";
        let countryForm = <Autocomplete
            getItemValue={(item) => item.label}
            items={this.props.latlng.countries.map(item => {
                return {
                    label: item.name
                }
            })}
            renderItem={(item, isHighlighted) =>
                <div className="menuAutocompleteElement" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                </div>
            }
            menuStyle={Object.assign({
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                overflow: 'auto',
                maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                zIndex: '2000'
            }, this.props.menuStyle)}
            inputProps={{ className: ' form-control', style: { width: '100%' }, autoComplete: false, placeholder: phTrans.translate('SETLATLNG_COUNTRY_PLACEHOLDER') }}
            wrapperStyle={{ width: '100%' }}
            value={this.state.countryValue}
            onChange={this.countryHander.bind(this)}
            onSelect={this.countrySelect.bind(this)}
        />

        let cityForm = <Autocomplete
            getItemValue={(item) => item.label}
            items={this.props.latlng.cities.map(item => {
                return {
                    label: item.name,
                    population: item.population,
                    rank: item.RANK
                }
            })}
            renderItem={(item, isHighlighted) =>
                <div className="menuAutocompleteElement" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                </div>
            }
            menuStyle={Object.assign({
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                overflow: 'auto',
                maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                zIndex: '2000'
            }, this.props.menuStyle)}
            sortItems={(objA, objB) => {
                console.log(objA);
                console.log(objB)
                return Number(objB.population) > Number(objA.population) ? 1 : -1
            }}
            inputProps={{ className: ' form-control', style: { width: '100%' }, autoComplete: false, placeholder: phTrans.translate('SETLATLNG_CITY_PLACEHOLDER') }}
            wrapperStyle={{ width: '100%' }}
            value={this.state.cityValue}
            onChange={this.cityHander.bind(this)}
            onSelect={this.citySelect.bind(this)}
        />
        /*
        let regionForm = <Autocomplete
            getItemValue={(item) => item.label}
            items={this.props.latlng.regions.map(item => {
                return {
                    label: item.name
                }
            })}
            renderItem={(item, isHighlighted) =>
                <div className="menuAutocompleteElement" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                </div>
            }
            menuStyle={Object.assign({
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                overflow: 'auto',
                maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                zIndex: '2000'
            }, this.props.menuStyle)}
            inputProps={{ className: ' form-control', style: { width: '100%' }, autoComplete: false, placeholder: phTrans.translate('SETLATLNG_REGION_PLACEHOLDER') }}
            wrapperStyle={{ width: '100%' }}
            value={this.state.regionValue}
            onChange={this.regionHander.bind(this)}
            onSelect={this.regionSelect.bind(this)}
        />
*/
        let body = <Form className="g-brd-around g-brd-gray-light-v3 g-pa-30 g-mb-10 ">
            <Col className="text-center mx-auto g-mb-10">
                <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('SETLATLNG_FORM_HEADER')}</h5>
                <br />
                <Label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20">{tran.translate('SETLATLNG_FORM_TEXT')}</Label>
            </Col>
            <FormGroup >
                <Row>
                    <Col class="col-3">

                        <Label for={this.state.guid} >{tran.translate('SETLATLNG_COUNTRY_LABEL')}</Label>

                    </Col>
                    <Col class="col-6">
                        {countryForm}
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup >
                <Row>
                    <Col class="col-3">

                        <Label for={this.state.guid} >{tran.translate('SETLATLNG_CITY_LABEL')}</Label>
                    </Col>
                    <Col class="col-6">
                        {this.state.countryId != undefined ? cityForm : <span></span>}
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup >
                <Row>
                    {map}
                </Row>
            </FormGroup>
            <br />

            {this.props.coords ? <ButtonLoader onClick={this.refreshGeolocation.bind(this)} size={"md"} className={"btn rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase g-mr-10 "} value={tran.translate('REFRESH_GEO_BUTTON_LABEL')} /> : <span></span>}

            <ButtonLoader onClick={this.submitHandler.bind(this)} size={"md"} className={"btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"} value={tran.translate('SET_COORDINATES_BUTTON_LABEL')} isLoading={this.props.latlng.isLoading} />

        </Form>

        return body


    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        latlng: state.SetLatlngReducer,
        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountries: (dto) => {
            dispatch(new BaseService().queryThunt(QueryList.Country.GET_COUNTRY, dto, null, Enums.LOADER.SET_CONTAINER_ACTION))
        },
       
        getCities: (dto) => {
            dispatch(new BaseService().queryThunt(QueryList.City.GET_CITY, dto, null, Enums.LOADER.SET_CONTAINER_ACTION))
        },
        setLatLng: (dto) => {
            return dispatch(new BaseService().queryThunt(CommandList.User.SET_COORDIATES, dto, null, Enums.LOADER.SET_CONTAINER_ACTION)).then(succ => {
                return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token));

            })
        }
        , setNotification: (type, message) => {
            dispatch({ type: SET_LATLNG_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(
    mapStateToProps,
    mapDispatchToProps
)(SetLatlng)); 

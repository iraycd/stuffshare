/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import UserRegisterInternalDTO from '../../../../../../Shared/DTO/User/UserRegisterInternalDTO.js';
import DayPickerInputComponent from '../../../../Components/FormComponent/Components/DayPickerInputComponent/index.jsx';
import CommandList from '../../../../../../Shared/CommandList.js';
//import Map from '../../../../Components/MapComponent/Map/index.js';
import { geolocated } from 'react-geolocated';
//import MapMarker from '../../../../Components/MapComponent/MapMarker/index.js';
import uuidv4 from "uuid/v4";
//import MapMarkerPopup from '../../../../Components/MapComponent/MapMarkerPopup/index.js';
import L from 'leaflet';
import  { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass

import 'leaflet/dist/leaflet.css';
//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//console.log(ReactLeaflet);
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = new UserRegisterInternalDTO();
        this.step = 1;
        this.state.validation = [];
        this.longitude = 0;
        this.latitude = 0;

    }

    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                //          this.validation();
            });
        }
    }

    validation() {
        let validation = UserRegisterInternalDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);

        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    nameHandler(event) {
        this.setState({
            name: event.target.value
        });

        this.refreshValidation();


    }
    surnameHandler(event) {
        this.setState({
            surname: event.target.value
        });

        this.refreshValidation();


    }
    countryHandler(event) {
        this.setState({
            country: event.target.value
        });

        this.refreshValidation();


    }
    regionHandler(event) {
        this.setState({
            region: event.target.value
        });

        this.refreshValidation();
    }
    cityHandler(event) {
        this.setState({
            city: event.target.value
        });

        this.refreshValidation();
    }
    phoneHandler(event) {
        this.setState({
            phone: event.target.value
        });

        this.refreshValidation();


    }
    birthDateHandler(event) {
        this.setState({
            birthDate: event.target.value
        });

        this.refreshValidation();


    }


    surnameHandler(event) {
        this.setState({
            surname: event.target.value
        });

        this.refreshValidation();


    }
    emailHandler(event) {
        this.setState({
            email: event.target.value
        });

        this.refreshValidation();


    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value
        });
        this.refreshValidation();
    }

    passwordRepeatHandler(event) {
        this.setState({
            passwordRepeat: event.target.value
        });
        this.refreshValidation();
    }


    submitHanlder(event) {
        this.state.toRefresh = true;
        event.preventDefault();
        //   if (this.validation().length == 0) {
        // this.props.code=this.state;

        this.props.createUser(this.state);

        //   }
    }

    componentDidMount() {
        console.log('kupa')
        console.log(this.longitude);
        console.log(this.latitude);
        console.log(this.props.coords)
        if (this.props.coords && this.longitude == 0 && this.latitude == 0) {
            console.log('kupa2')

            console.log(this.props)
            this.setState({
                longitude: props.coords.longitude,
                latitude: props.coords.latitude
            });

        }
    }

    /*
     
        this.phone = '';
        this.birthDate = '';
        this.uid = ''
        this.is_authorized = '';
        this.passwordHash = '';
        this.city = '';
        this.city_id = '';
        this.adress = '';
        this.country = '';
        this.country_id = '';
        this.longitude = '';
        this.latitude = '';
        this.relogin_require = '';
        this.refresh_token = '';
        this.language=''
    */

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        this.refreshValidation();




        if (this.step == 1) {
            const position = [51.505, -0.09]
     



            let body = <div></div>
            return this.props.coords
                ? <Row className="size-100">
                    <span>latitude {this.props.coords.latitude}</span>
                    <span>longitude{this.props.coords.longitude}</span>
                
                    <Map className="size-map-100" center={[this.props.coords.latitude,this.props.coords.longitude]} zoom={16}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
<MarkerClusterGroup>
                        <Marker position={[this.props.coords.latitude,this.props.coords.longitude]}>
                            <Popup><Row>A pretty CSS3 popup. {this.props.coords.latitude} <br/> Easily customizable.</Row>
</Popup>
                        </Marker>
                        <Marker position={[this.props.coords.latitude+1,this.props.coords.longitude+1]}>
                            <Popup><Row>A pretty CSS3 popup. {this.props.coords.latitude} <br/> Easily customizable.</Row>
</Popup>
                        </Marker>
                        <Marker position={[this.props.coords.latitude,this.props.coords.longitude+2]}>
                            <Popup><Row>A pretty CSS3 popup. {this.props.coords.latitude} <br/> Easily customizable.</Row>
</Popup>
                        </Marker>
                        </MarkerClusterGroup>
                    </Map>
                </Row >
                : <div>Getting the location data&hellip; </div>;
         


        } else {
            return (

                <Form className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-10 text-center">
                    <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                        <h5 className="g-color-black mb-2">{tran.translate('REGISTER_FORM_HEADER')}</h5>
                        <p className="lead "></p>
                    </Col>

                    <TextBox placeholder={phTrans.translate('REGISTER_EMAIL_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_EMAIL_LABEL')} value={this.state.email} onChange={this.emailHandler.bind(this)} field="email" validation={this.state.validation} />

                    <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PASSWORD_LABEL')} value={this.state.password} onChange={this.passwordHandler.bind(this)} field="password" validation={this.state.validation} />
                    <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_REPEAT_PLACEHOLDER')} isRequired={false} label={""} value={this.state.passwordRepeat} onChange={this.passwordRepeatHandler.bind(this)} field="passwordRepeat" validation={this.state.validation} />

                    <TextBox placeholder={phTrans.translate('REGISTER_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />


                    <DayPickerInputComponent placeholder={phTrans.translate('REGISTER_BIRTHDATE_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_BIRTHDATE_LABEL')} onChange={this.birthDateHandler} field="birthDate" validation={this.state.validation} />

                    <TextBox placeholder={phTrans.translate('REGISTER_PHONE_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PHONE_LABEL')} value={this.state.phone} onChange={this.phoneHandler.bind(this)} field="phone" validation={this.state.validation} />


                    <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn u-btn-primary rounded-0"} value={tran.translate('REGISTER_SUBMIT_LABEL')} isLoading={this.props.registerUser.isLoading} />
                </Form>

            );
        }

    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        registerUser: state.RegisterReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (dto) => {
            dispatch(new BaseService().commandThunt(CommandList.User.CREATE_USER, dto, null, Enums.LOADER.SET_CONTAINER_ACTION));
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
)(Register)); 
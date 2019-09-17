/*
    ./client/components/App.jsx
*/

import React from 'react';
import Link from 'react-router';

import { connect } from 'react-redux';
import { Col, Container, Row, Label } from 'reactstrap';
import { Translator } from '../../../../../../Shared/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { BaseService } from '../../../../../App/index.js';
import { TextArea, TextBox } from '../../../../Components/index.js';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import CategoryTreePreview from '../../../Categories/Scenes/CategoryTreePreview/index.jsx';
import ItemDTO from './../../../../../../Shared/DTO/Item/ItemDTO.js';
import CategoryOptionTempFormMapper from '../../../Categories/Components/CategoryOptionTempMapper/CategoryOptionTempFormMapper.jsx';
import CommandList from '../../../../../../Shared/CommandList.js';
import uuidv4 from "uuid/v4";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer, Circle, CircleMarker } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import { geolocated } from 'react-geolocated';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Img from 'react-image'
import SearchItemDTO from './../../../../../../Shared/DTO/Item/SearchItemDTO.js'
import { withRouter } from 'react-router-dom';
import PreviewItemOptions from '../../Components/PreviewItemOptions/index.jsx';
import { slide as Menu } from 'react-burger-menu'
import FilterSearch from './../FilterSearch/index.jsx'

const queryString = require('query-string');




//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});





class SearchMap extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.state.search = new SearchItemDTO()
        this.state.zoom = 13
        this.state.validation = [];
        this.state.latitude = 0;
        this.state.longitude = 0;
        this.state.result = [];
        this.state.radius = 1000;

    }
    showSettings(event) {
        event.preventDefault();

    }
    componentDidMount() {

        const parsed = queryString.parse(location.search);

        this.state.search.distance = parsed.rad ? parsed.rad : '1km';
        if (this.state.search.distance.indexOf('m') > 0) {
            this.state.radius = Number(this.state.search.distance.split('m')[0])
        }
        if (this.state.search.distance.indexOf('km') > 0) {
            this.state.radius = Number(this.state.search.distance.split('km')[0]) * 1000
        }

        console.log(this.state.radius);
        this.setState({
            radius: this.state.radius
        })
        this.state.search.lat = this.state.latitude != 0 ? this.state.latitude : (parsed.lat ? parsed.lat : this.props.auth.user.latitude);
        this.state.search.lon = this.state.longitude != 0 ? this.state.longitude : (parsed.lon ? parsed.lon : this.props.auth.user.longitude);
        this.state.search.freetext = parsed.q;
        this.setState({
            search: this.state.search
        })
        this.props.getItems(this.state.search).then(succ => {
            this.setState({
                result: succ.data
            })
        })
    }

    goToUser(event) {
        this.props.history.push('/user/' + event.target.getAttribute('data-tag'));


    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }


    showValue(item) {
        console.log(item)
        if (item.category_link.catOption.cat_opt.type == "SELECT") {
            return this.selectValue(item);
        }
        else if (item.category_link.catOption.cat_opt.type == "MULTI_SELECT") {
            return this.selectValue(item);

        }
        else if (item.category_link.catOption.cat_opt.type == "SINGLE") {
            return this.singleValue(item);
        }
        else if (item.category_link.catOption.cat_opt.type == "GEOCOORDINATE") {
            return "TO_DOOOOO"
        }
        else if (item.category_link.catOption.cat_opt.type == "BETWEEN") {
            return "TO_DOOOOO"
        }
        else if (item.category_link.catOption.cat_opt.type == "IMAGE") {
            return "TO_DOOOOO"
        } else {
            ; return item.value;
        }
    }
    singleValue(item) {
        return item.value;
    }
    selectValue(item) {
        return item.cat_opt_temp["value_" + this.props.lang];
    }



    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


        let latlng = [0, 0];
        if (this.props.auth && this.props.auth.user) {
            if (this.state.setLonLat == 1) {
                latlng = [this.state.latitude, this.state.longitude];
            } else if (this.state.latitude != 0 && this.state.longitude != 0) {
                latlng = [this.state.latitude, this.state.longitude];
            } else {
                latlng = [this.props.auth.user.latitude, this.props.auth.user.longitude];
            }
        } else if (this.state.latitude && this.state.longitude) {
            latlng = [this.state.latitude, this.state.longitude]
        }
        // <Marker position={latlng} >
        const createClusterCustomIcon = function (cluster) {
            return L.divIcon({
                html: `
                    <svg viewBox="0 0 80 80" width="40" height="70" style="overflow: visible;">
                        <defs>
                            <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                                <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                            </filter>
                            <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                                <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                            </filter>
                        </defs>
                        <style>
                            .small { font: italic 13px sans-serif; }
                            .heavy { font: bold 30px sans-serif; text-align:center }
                        
                            /* Note that the color of the text is set with the    *
                            * fill property, the color property is for HTML only */
                            .Rrrrr { font: italic 40px serif; fill: red; }
                      </style>
                    
                        <g>
                   
                        <ellipse filter="url(#svg_5_blur)" opacity="0.5" ry="11" rx="27.5" id="svg_5" cy="74" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                        <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="74" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                        <ellipse stroke="{color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="{color}"/>
                        <ellipse stroke="{color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                        <text font-size="11" stroke-width="0" stroke="#000" alignment-baseline="middle" text-anchor="middle" class="heavy" x="35" y="38">${cluster.getChildCount()}</text>
                        </g>
                    </object>`,
                className: 'marker-cluster-custom',
                iconSize: [40, 40],
                iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -35],
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            });
        }
        //</Marker>
        let map = <Map zoomControl={false}
            minZoom={6} className="size-map-80vh" center={latlng} zoom={this.state.zoom}
            ref={(ref) => {
                this.map = ref;

            }}

        >
            <Circle opacity={0.5} center={latlng} fillColor="#666" color="#e74c3c" fillOpacity={0.1} radius={this.state.radius} strokeWidth={1} />

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>

                {this.state.result ? this.state.result.map(item => {
                    //  console.log(item);
                    let color = '#ff7c7c';
                    let cat = item.itemCategoryOption.filter(category => { return category.category_link.is_on_pin_map == null ? category.category_link.catOption.is_on_pin_map : category.category_link.is_on_pin_map })[0];
                    console.log(item.category.icon)
                    var png = require(`./../../../../assets/markers/${item.category.icon}.png`)
                    let myIcon = L.divIcon({
                        html: `
                        <svg viewBox="0 0 80 80" width="40" height="70" style="overflow: visible;">
                            <defs>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                                    <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                                </filter>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                                    <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <style>
                                .small { font: italic 13px sans-serif; }
                                .heavyText {font: 500 30px sans-serif; text-align:center }
                            
                                /* Note that the color of the text is set with the    *
                                * fill property, the color property is for HTML only */
                                .Rrrrr { font: italic 40px serif; fill: red; }
                          </style>
                        
                            <g>
                            <rect x="-15" y="-35" width="100" height="30" fill="white" opacity="0.8"></rect>
                            <text font-size="15" stroke-width="0" stroke="#000" alignment-baseline="middle" text-anchor="middle" class="heavyText" x="35" y="-15">${this.showValue(cat)}</text>
                            <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                            <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                            <rect stroke="${color}" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="${color}"/>
                            <ellipse stroke="${color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${color}"/>
                            <ellipse stroke="${color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                            <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
                           </g>
                        </object>`,
                        iconSize: [30, 40],
                        iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
                        popupAnchor: [0, -35],
                        className: 'marker-cluster-custom'

                    });
                    let img = item.blobs[0] ? `data:${item.blobs[0].blob_min.type};base64,${item.blobs[0].blob_min.blob}` : ''

                    return (<Marker position={[item.latitude, item.longitude]} icon={myIcon}>
                        <Popup>

                            <div xs="9" class="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left g-pa-5 rounded-0  g-mb-2">

                                <div class="media-body g-pl-5">
                                    <Row>
                                        <Col xs="8" >
                                            <h5 class="h6 g-font-size-11 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase  g-color-gray-dark-v4 g-mb-1">{item.name}</h5>
                                            <label class="g-line-height-1_5 g-letter-spacing-1 g-mb-1 g-font-weight-500 g-font-size-9 form-control-label">{item.category["category_" + this.props.lang]}</label>
                                            <br />
                                            <span data-tag={item.user.id} onClick={this.goToUser.bind(this)} className="g-letter-spacing-1 text-nowrap g-color-blue g-cursor-pointer" >
                                                {item.user.name}
                                            </span>
                                        </Col>
                                        <Col xs="3" className="g-pa-0 g-ma-0" >
                                            {item.blobs[0] ? <Img src={img.toString()} className={"img-fluid u-block-hover__main u-block-hover__img "} /> : <span></span>}
                                        </Col>
                                    </Row>
                                    <div className="g-pb-10">
                                        <div class="d-flex justify-content-center text-center g-mb-8 g-mt-8"><div class="d-inline-block align-self-center g-width-100 g-height-1  g-bg-gray-light-v3"></div><span class="align-self-center text-uppercase  g-color-gray-dark-v2  g-color-gray-dark-v4 g-letter-spacing-2  g-mx-5  g-font-weight-600 g-font-size-9">{tran.translate('MAP_PIN_DESCRIPTION_LABEL')}</span><div class="d-inline-block align-self-center g-width-100 g-height-1 g-bg-gray-light-v3"></div></div>
                                        <Row>
                                            <PreviewItemOptions item={item} on_map={true} lang={this.props.lang} col_size="6" />


                                        </Row>
                                    </div>
                                    {item.tags.slice(0, 6).map(item => {
                                        return <span class="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-1 g-cursor-pointer">{item.tag}</span>

                                    })}{
                                        item.tags.length > 6 ? <span className="g-pl-10">{"+" + (item.tags.length - 6) + " " + tran.translate('MAP_MORE_TAGS_LABEL')}</span> : <span></span>
                                    } <span></span>
                                </div>

                            </div>
                        </Popup>
                    </Marker>)
                }) : <span></span>}
            </MarkerClusterGroup>




        </Map>

        return (
            <div id="outer-container" style={{ position: "relative", overflowX: 'hidden' }}> <Menu styles={{
                bmBurgerButton: {
                    fontSize: '17px',

                    left: '18px',

                }

            }} width={'20%'} customBurgerIcon={<span  ><i class="fa fa-filter" style={{ fontSize: '20px' }}></i><br /><span className="g-line-height-1_0">{0}</span></span>}>
                <FilterSearch />
            </Menu >
                <Menu id="fallDown" fallDown={true} pageWrapId={"page-wrap"} outerContainerId={"outer-container"} styles={{
                    bmBurgerButton: {
                        top: '15%',
                        left: '18px',
                        fontSize: '17px',
                        textAlign: 'center'

                    }
                }} width={'38%'} customBurgerIcon={<span  ><i class="fa fa-list" style={{ fontSize: '20px' }}></i><br /><span className="g-line-height-1_0">{this.state.result.length}</span></span>}>
                    <div className="g-bg-white">
                        {this.state.result ? this.state.result.map(item => {
                            //  console.log(item);
                            let color = '#ff7c7c';
                            let cat = item.itemCategoryOption.filter(category => { return category.category_link.is_on_pin_map == null ? category.category_link.catOption.is_on_pin_map : category.category_link.is_on_pin_map })[0];
                            console.log(item.category.icon)
                            var png = require(`./../../../../assets/markers/${item.category.icon}.png`)

                            let img = item.blobs[0] ? `data:${item.blobs[0].blob_min.type};base64,${item.blobs[0].blob_min.blob}` : ''

                            return (

                                <div xs="9" class="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left g-pa-5 rounded-0  g-mb-2">

                                    <div class="media-body g-pl-5">
                                        <Row>
                                            <Col xs="8" >
                                                <h5 class="h6 g-font-size-11 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase  g-color-gray-dark-v4 g-mb-1">{item.name}</h5>
                                                <label class="g-line-height-1_5 g-letter-spacing-1 g-mb-1 g-font-weight-500 g-font-size-9 form-control-label">{item.category["category_" + this.props.lang]}</label>
                                                <br />
                                                <span data-tag={item.user.id} onClick={this.goToUser.bind(this)} className="g-letter-spacing-1 text-nowrap g-color-blue g-cursor-pointer" >
                                                    {item.user.name}
                                                </span>
                                            </Col>
                                            <Col xs="3" className="g-pa-0 g-ma-0" >
                                                {item.blobs[0] ? <Img src={img.toString()} className={"img-fluid u-block-hover__main u-block-hover__img "} /> : <span></span>}
                                            </Col>
                                        </Row>
                                        <div className="g-pb-10">
                                            <Row>
                                                <PreviewItemOptions item={item} on_map={true} lang={this.props.lang} col_size="3" />


                                            </Row>
                                        </div>
                                        {item.tags.slice(0, 6).map(item => {
                                            return <span class="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-1 g-cursor-pointer">{item.tag}</span>

                                        })}{
                                            item.tags.length > 6 ? <span className="g-pl-10">{"+" + (item.tags.length - 6) + " " + tran.translate('MAP_MORE_TAGS_LABEL')}</span> : <span></span>
                                        } <span></span>
                                    </div>

                                </div>
                            )
                        }) : <span></span>}
                </div>
                </Menu >
                <Menu width={'20%'} styles={{
                    bmBurgerButton: {
                        position: 'absolute',

                        right: '18px',
                        top: '5%',
                        fontSize: '17px',
                        textAlign: 'center'
                    }

                }} right customBurgerIcon={<span  ><i class="fa fa-bar-chart" style={{ fontSize: '20px' }}></i><br /><span className="g-line-height-1_0">{0}</span></span>}>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
                </Menu ><div id="page-wrap">{map}</div></div>



        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        offerItem: state.NewOfferItemReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {


        getFullsizeImage: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_BLOBS_BY_GUIDS, dto, null))

        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: USER_ACCOUNTS_ACTION.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            })

        },
        getItems: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Item.SEARCH_ITEM, dto));

        },
        createNewItem: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));

        },
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },


    }
}

export default withRouter(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchMap)));
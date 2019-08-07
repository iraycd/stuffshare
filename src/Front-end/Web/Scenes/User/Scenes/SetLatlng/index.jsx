/*
    ./client/components/App.jsx
*/

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import Autocomplete from 'react-autocomplete';
import { geolocated } from 'react-geolocated';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Label, Row, Input, Button } from 'reactstrap';
import CommandList from '../../../../../../Shared/CommandList.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { ButtonLoader, TextBox } from './../../../../Components/index.js';
import SET_LATLNG_ACTIONS from './actions.js';
import MapForm from './../../../../Components/MapForm/index.jsx'

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
    }
    submitHandler(dto) {
console.log(dto)
        this.props.setLatLng(dto).then(succ => {
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('SET_LANG_SAVE_SUCCESS')
            );
        })

    }

    render() {

  
        return <Col className=" g-brd-around g-brd-gray-light-v3 g-pa-10 g-mb-10" ><MapForm icon="user" onSubmit={this.submitHandler.bind(this)}
         form_header={  Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('SETLATLNG_FORM_HEADER')} 
         form_text={  Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('SETLATLNG_FORM_TEXT')} ></MapForm></Col>


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
            return dispatch(new BaseService().queryThunt(QueryList.Country.GET_COUNTRY, dto, null, Enums.LOADER.SET_CONTAINER_ACTION))
        },

        getCities: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.City.GET_CITY, dto, null, Enums.LOADER.SET_CONTAINER_ACTION))
        },
        getAddress: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, dto))
        },
        getReverseByLatLng: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_LATLNG_GEO, dto))

        }
        ,
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

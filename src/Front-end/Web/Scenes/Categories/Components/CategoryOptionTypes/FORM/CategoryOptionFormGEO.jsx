import React from 'react';
import { geolocated } from 'react-geolocated';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import QueryList from '../../../../../../../Shared/QueryList';
import { BaseService } from '../../../../../../App/Architecture/baseServices.js';
import ButtonLoader from '../../../../../Components/FormComponent/Components/ButtonLoader/index.jsx';
import TextBox from '../../../../../Components/FormComponent/Components/TextBox/index.jsx';
import { Translator } from './../../../../../../../Shared/index.js';
import MapForm from '../../../../../Components/MapForm/index.jsx';
import uuidv4 from "uuid/v4";

//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class CategoryOptionFormGEO extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.geo = this.props.values ? this.props.values : [0, 0];
        this.state.latitude = this.state.geo[0];
        this.state.longitude = this.state.geo[1]
        this.state.markers = [];
        this.myIcon = L.icon({
            iconUrl: require(`./../../../../../assets/markers/${encodeURIComponent(this.props.categoryIcon)}-black.svg`),
            iconSize: [30, 40],
            iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -35],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null
        });
        this.myIconResults = L.icon({
            iconUrl: require(`./../../../../../assets/markers/${encodeURIComponent(this.props.categoryIcon)}-blue.svg`),
            iconSize: [30, 40],
            iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -35],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null
        });

    }


    onChange(state) {
        let id = this.props.catOption.id;
            let result = [
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 6 })[0].id,val: state.cityId,element:id},
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 4 })[0].id,val: state.countryId,element:id},
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 3 })[0].id,val: state.countryValue,element:id},
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 2})[0].id,val: state.latitude,element:id},
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 5})[0].id,val: state.cityValue,element:id},
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 7})[0].id,val: state.address,element:id},
                {id:this.props.catOption.cat_opt_temp.filter(item => { return item.order == 1})[0].id,val: state.longitude,element:id}
            ]


        console.log(state)
        console.log(this.props.catOption.cat_opt_temp);
        //this.setState(state);
        this.props.onChange(null,result)

    }
    getDropDownValues() {
        return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
            return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
        })];
    }

    /*  onChange(coordinate) {
          console.log(coordinate)
      }*/


    render() {


        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


        //zoom={this.state.zoom} onzoomend={this.onZoom.bind(this)} onClick={this.addMarker.bind(this)}
        return (

            <MapForm icon={encodeURIComponent(this.props.categoryIcon)} getFromUser={true} onChange={this.onChange.bind(this)} form_text={this.props.catOption["name_" + this.props.lang]}></MapForm>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer
        //  catOptions: state.EditCategoryReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        getReverseGeocode: (query) => {
            return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, { query: query }));
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
)(CategoryOptionFormGEO));

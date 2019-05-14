/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import logo from './../../../../assets/img/logo/logo-2.png';
import CommandList from '../../../../../../Shared/CommandList.js';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import 'leaflet/dist/leaflet.css';

//import { Map } from 'react-leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.validation = [];
        this.open = false;
        this.state.activeTab = '1';
        this.state.mapHeight=props.mapHeight>0?props.mapHeight:500


    }


    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }


    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


        let modalBody = <div></div>;

        let latlng = [this.props.auth.user.latitude, this.props.auth.user.longitude]

        let body =
                <Form className="g-brd-around g-brd-gray-light-v3 g-pa-30 g-mb-10 text-left">
                    <Col className="text-center mx-auto g-mb-10">
                        <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('USER_INFO_HEADER')}</h5>
                        <br />
                    </Col>


                    <Row>
                        <Col xs="4" >
                            <Label>{tran.translate('USER_PROFILE_MODAL_NAME_SURNAME')}</Label>
                        </Col>
                        <Col xs="8"><Label>{this.props.auth.user.name} {this.props.auth.user.surname}</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" >
                            <Label>{tran.translate('USER_PROFILE_MODAL_EMAIL')}</Label>
                        </Col>
                        <Col xs="8"><Label>{this.props.auth.user.email} </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" >
                            <Label>{tran.translate('USER_PROFILE_MODAL_PHONE')}</Label>
                        </Col>
                        <Col xs="8"><Label>{this.props.auth.user.phone} </Label>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Map className={`size-map-${this.state.mapHeight}px`} center={latlng} zoom={13}>


                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={latlng}>

                            </Marker>

                        </Map>


                    </Row>

                </Form>
        return (

            body

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        user: state.UserReducer,
        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);
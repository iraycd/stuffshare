/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Form, Label, Row } from 'reactstrap';
import CommandList from '../../../../../../Shared/CommandList.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import logo from './../../../../assets/img/logo/logo-2.png';
import { ButtonLoader } from './../../../../Components/index.js';

    constructor() {
        super();
        this.state = {};
        this.state.validation = [];
        this.open = false;
        this.toggle = this.toggle.bind(this);
        this.state.activeTab = '1';

    }

    onOpenModal() {
        this.setState({ open: true });
    };

    onCloseModal() {
        this.props.closeWindow();
    };
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    logOut(){
        this.props.logOut();
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token")
      
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


        let modalBody = <div></div>;


        let body =
            <Container className="g-brd-gray-light-v3">
                <Form className="g-brd-around g-brd-gray-light-v3 g-pa-30 g-mb-10 text-center">

                    <br />
                    <h5 className="g-color-black mb-2">{tran.translate('USER_PROFILE_MODAL_HEADER')}</h5>
                    <br />

                    <Row>
                        <Col xs="4">
                            <img src={logo} className={"g-mb-10 g-pa-20 img-logo-width"} />


                            <ButtonLoader size={"sm"} className={"btn rounded-0 btn-block " + (this.props.user.modal.action == '' ? 'u-btn-primary' : '')} value={tran.translate('USER_PROFILE_MODAL_CHANGE_PASSWORD')} />
                            <ButtonLoader size={"sm"} className={"btn rounded-0 btn-block " + (this.props.user.modal.action == '' ? 'u-btn-primary' : '')} value={tran.translate('USER_PROFILE_MODAL_UPDATE_USER')} />
                            <ButtonLoader onClick={this.logOut.bind(this)} size={"sm"} className={"btn rounded-0 btn-block " + (this.props.user.modal.action == '' ? 'u-btn-primary' : '')} value={tran.translate('USER_PROFILE_MODAL_LOG_OUT')} />

                        </Col>
                        <Col xs="8" className="text-left">
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
                        </Col>
                    </Row>
                </Form>
            </Container>
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
        auth:state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserImages: () => {
            dispatch(new BaseService().commandThunt(QueryList.Blob.GET_USER_IMAGES, {}, localStorage.token));
        },

        logOut: () => {
            dispatch(
                new BaseService().commandThunt(CommandList.User.LOG_OUT, {}, localStorage.token)
            )
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileInfo);
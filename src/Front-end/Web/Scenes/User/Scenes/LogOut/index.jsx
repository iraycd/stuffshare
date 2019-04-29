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
import { Redirect } from 'react-router'
import LOGOUT_ACTIONS from './actions.js';


class LogOut extends React.Component {

    constructor() {
        super();
        this.state = {};


        this.state.logOut = 0;

    }


    logOUt() {
        this.setState({
            logOut: 1
        });
        this.props.logOut().then(succ => {
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('LOGGED_OUT_SUCCESS')
            )
        })
    };
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }

    render() {
        if (this.state.logOut == 1) {
            return (<Redirect to="/" />)
        } else {
            const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
            const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


            let modalBody = <div></div>;


            let body =
                <div className=" text-center">
                    <Form className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-10 text-center">
                        <Col className="text-center mx-auto g-mb-10">
                            <h5 className="g-color-black mb-2">{tran.translate('LOGOUT_USER_HEADER')}</h5>
                            <br />
                            <Label>{tran.translate('LOGOUT_USER_TEXT_HEADER')}</Label>

                        </Col>

                        <ButtonLoader onClick={this.logOUt.bind(this)} size={"md"} className={"btn u-btn-primary rounded-0"} value={tran.translate('LOGOUT_ACCOUNT_BUTTON_LABEL')} />

                    </Form>
                </div>
            return (

                body

            );
        }

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

        logOut: () => {
            return dispatch(
                new BaseService().commandThunt(CommandList.User.LOG_OUT, {}, localStorage.token)
            )
        }, setNotification: (type, message) => {
            dispatch({ type: LOGOUT_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogOut);
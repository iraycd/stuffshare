/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from './../../../../Shared/index.js';
import { BaseService } from './../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../Components/index.js';
import UserLoginInternalDTO from '../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import QueryList from '../../../../Shared/QueryList.js';
import Modal from 'react-responsive-modal'
import Login from './Scenes/Login/index.jsx';
import ForgotPassword from './Scenes/ForgotPassword/index.jsx';
import Register from './Scenes/Register/index.jsx';
import { USER_ACTIONS } from '../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';

import logo from './../../assets/img/logo/logo-2.png';

class UserModal extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;

    }

    onOpenModal() {
        this.setState({ open: true });
    };

    onCloseModal() {
        this.props.closeWindow();
    };
    onForgotPaswordBtn() {
        this.props.changeAction(true, 'FORGOT_PASSWORD');
    };
    onCreateAccountBtn() {
        this.props.changeAction(true, 'CREATE_ACCOUNT');
    };
    onLoginBtn() {
        this.props.changeAction(true, 'LOGIN');
    };
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        if (this.props.user.login.auth) {
            localStorage.token = this.props.user.login.auth.token;
            localStorage.refresh_token = this.props.user.login.auth.refresh_token;
        }

        let modalBody = <div></div>;
        if (this.props.user.modal.action == 'LOGIN') {
            modalBody =<Login></Login>
        } else if (this.props.user.modal.action == 'CREATE_ACCOUNT') {
            modalBody =<Register></Register>
        }
        else if (this.props.user.modal.action == 'FORGOT_PASSWORD') {
            modalBody =<ForgotPassword></ForgotPassword>
            

        }

        let body =
            <div><Modal open={this.props.user.modal.open} onClose={this.onCloseModal.bind(this)} center closeIconSize={15} >
                <Container className="g-pa-15">
                    <Row>
                        <Col xs="8">
                            {modalBody}
                        </Col>
                        <Col xs="4" >
                            <img src={logo} className={"g-mb-10 g-pa-20 img-logo-width"} />


                            <ButtonLoader onClick={this.onLoginBtn.bind(this)} size={"sm"} className={"btn rounded-0 btn-block " + (this.props.user.modal.action == 'LOGIN' ? 'u-btn-primary' : '')} value={tran.translate('LOGIN_SIGN_IN_BTN_LABEL')} />
                            <ButtonLoader onClick={this.onCreateAccountBtn.bind(this)} size={"sm"} className={"btn rounded-0  btn-block " + (this.props.user.modal.action == 'CREATE_ACCOUNT' ? 'u-btn-primary' : '')} value={tran.translate('LOGIN_CREATEA_ACCOUNT_BTN_LABEL')} />
                            <ButtonLoader onClick={this.onForgotPaswordBtn.bind(this)} size={"sm"} className={"btn rounded-0 btn-block " + (this.props.user.modal.action == 'FORGOT_PASSWORD' ? 'u-btn-primary' : '')} value={tran.translate('LOGIN_FORGOT_PASSWOD_BTN_LABEL')} />

                        </Col>
                    </Row>
                </Container>
            </Modal>
            </div>;
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
        user: state.UserReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginInternal: (dto) => {
            dispatch(new BaseService().commandThunt(QueryList.User.LOG_IN_INTERNAL, dto));
        },
        changeAction: (open, action) => {
            dispatch({
                type: USER_ACTIONS.OPEN_WINDOW,
                dto: {
                    open: open,
                    action: action
                }
            });
        },
        closeWindow: () => {
            dispatch({
                type: USER_ACTIONS.CLOSE_MODAL,
                dto: {
                    open: false,
                }
            });
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserModal);
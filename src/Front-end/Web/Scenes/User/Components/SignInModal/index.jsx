/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from '../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from '../../../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import Modal from 'react-responsive-modal'
import Login from '../../Scenes/Login/index.jsx';
import ForgotPassword from '../../Scenes/ForgotPassword/index.jsx';
import Register from '../../Scenes/Register/index.jsx';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import logo from './../../../../assets/img/logo/logo-2.png';
import SIGN_IN_MODAL_ACTIONS from './actions.js';



class SignInModal extends React.Component {

    constructor() {
        super();


    }

   

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
       // if (this.props.user.login.auth.token) {
        //    localStorage.token = this.props.user.login.auth.token;
         //   localStorage.refresh_token = this.props.user.login.auth.refresh_token;
        //}
        //console.log(this.props);
        let modalBody = <div></div>;
        if (this.props.siginInModal.action == 'LOGIN') {
            modalBody =<Login></Login>
        } else if (this.props.siginInModal.action == 'CREATE_ACCOUNT') {
            modalBody =<Register></Register>
        }
        else if (this.props.siginInModal.action == 'FORGOT_PASSWORD') {
            modalBody =<ForgotPassword></ForgotPassword>
        }

        let body =
                <Container className="g-pa-15">
                    <Row>
                        <Col xs="8">
                            {modalBody}
                        </Col>
                        <Col xs="4" >
                            <img src={logo} className={"g-mb-10 g-pa-20 img-logo-width"} />
                            <ButtonLoader onClick={this.onLoginBtn.bind(this)} size={"sm"} className={"btn rounded-0 btn-block " + (this.props.siginInModal.action == 'LOGIN' ? 'u-btn-primary' : '')} value={tran.translate('LOGIN_SIGN_IN_BTN_LABEL')} />
                            <ButtonLoader onClick={this.onCreateAccountBtn.bind(this)} size={"sm"} className={"btn rounded-0  btn-block " + (this.props.siginInModal.action == 'CREATE_ACCOUNT' ? 'u-btn-primary' : '')} value={tran.translate('LOGIN_CREATEA_ACCOUNT_BTN_LABEL')} />
                            <ButtonLoader onClick={this.onForgotPaswordBtn.bind(this)} size={"sm"} className={"btn rounded-0 btn-block " + (this.props.siginInModal.action == 'FORGOT_PASSWORD' ? 'u-btn-primary' : '')} value={tran.translate('LOGIN_FORGOT_PASSWOD_BTN_LABEL')} />

                        </Col>
                    </Row>
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
        modal:state.ModalComponentReducer,
        siginInModal:state.SignInModalReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        changeAction: (open, action) => {
            dispatch({
                type: SIGN_IN_MODAL_ACTIONS.OPEN_MODAL,
                dto: {
                    open: open,
                    action: action
                }
            });
        },
        closeWindow: () => {
            dispatch({
                type: SIGN_IN_MODAL_ACTIONS.CLOSE_WINDOW,
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
)(SignInModal);
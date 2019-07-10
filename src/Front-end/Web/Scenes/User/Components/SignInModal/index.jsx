/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Translator } from '../../../../../../Shared/index.js';
import ForgotPassword from '../../Scenes/ForgotPassword/index.jsx';
import Login from '../../Scenes/Login/index.jsx';
import Register from '../../Scenes/Register/index.jsx';
import logo from './../../../../assets/img/logo/logo-2.png';
import SIGN_IN_MODAL_ACTIONS from './actions.js';



class SignInModal extends React.Component {

    constructor() {
        super();


    }



    onCloseModal() {
        this.props.closeWindow();
    };
    onForgotPaswordBtn(event) {
        event.preventDefault();

        this.props.changeAction(true, 'FORGOT_PASSWORD');
    };
    onCreateAccountBtn(event) {
        event.preventDefault();

        this.props.changeAction(true, 'CREATE_ACCOUNT');
    };
    onLoginBtn(event) {
        event.preventDefault();

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
            modalBody = <Login></Login>
        } else if (this.props.siginInModal.action == 'CREATE_ACCOUNT') {
            modalBody = <Register></Register>
        }
        else if (this.props.siginInModal.action == 'FORGOT_PASSWORD') {
            modalBody = <ForgotPassword></ForgotPassword>
        }

        let body =
            <Container className="g-pl-0">
                <Row>
                    <Col xs="8">
                        {modalBody}
                    </Col>
                    <Col xs="4" className="g-pa-5" >
                        <img src={logo} className={"g-mb-10 g-pa-20 img-logo-width"} />
                        <div class="list-group list-group-border-0">

                            <Link onClick={this.onLoginBtn.bind(this)} to="/login" className={"list-group-item list-group-item-action justify-content-between u-link-v5  g-pl-7--hover " + (this.props.siginInModal.action == 'LOGIN' ? 'active' : '')}>
                                <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {tran.translate('LOGIN_SIGN_IN_BTN_LABEL')}</span>
                            </Link>
                            <Link onClick={this.onCreateAccountBtn.bind(this)} to="/createAccount" className={"list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover " + (this.props.siginInModal.action == 'CREATE_ACCOUNT' ? 'active' : '')}>
                                <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {tran.translate('LOGIN_CREATEA_ACCOUNT_BTN_LABEL')}</span>
                            </Link>
                            <Link onClick={this.onForgotPaswordBtn.bind(this)} to="/forgot_password" className={"list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover " + (this.props.siginInModal.action == 'FORGOT_PASSWORD' ? 'active' : '')}>
                                <span className={"g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase "}> {tran.translate('LOGIN_FORGOT_PASSWOD_BTN_LABEL')}</span>
                            </Link>
                        </div>
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
        modal: state.ModalComponentReducer,
        siginInModal: state.SignInModalReducer
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
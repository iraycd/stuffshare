/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Col, Form } from 'reactstrap';
import CommandList from '../../../../../../Shared/CommandList';
import UserForgotPasswordDTO from '../../../../../../Shared/DTO/User/UserForgotPasswordDTO.js';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { ButtonLoader, TextBox } from './../../../../Components/index.js';
import FORGOT_PASSWORD_ACTIONS from './actions.js';

class ForgotPassword extends React.Component {

    constructor() {
        super();
        this.state = new UserForgotPasswordDTO();
        this.state.validation = [];
    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                this.validation();
            });
        }
    }

    validation() {
        let validation = UserForgotPasswordDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);

        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    emailHandler(event) {
        this.setState({
            email: event.target.value
        });

        this.refreshValidation();


    }



    submitHanlder(event) {
        this.setState({
            toRefresh: 1
        })
        event.preventDefault();
        if (this.validation().length == 0) {
            this.props.forgotPassowrd(this.state).then(succ => {

                this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,  
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('FORGOT_PASSWORD_SEND_MAIL_SUCCESS')
                )
            });

        }


    }


    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        return (

            <Form className="g-brd-around g-brd-gray-light-v3 g-min-height-200 g-pa-30 g-mb-10 text-center g-height-350">
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                    <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('FORGOT_PASSWORD_FORM_HEADER')}</h5>
                    <p className="lead "></p>
                </Col>

                <TextBox placeholder={phTrans.translate('FORGOT_PASSWORD_USER_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('FORGOT_PASSWORD_USER_NAME_LABEL')} value={this.state.email} onChange={this.emailHandler.bind(this)} field="email" validation={this.state.validation} />


                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"} value={tran.translate('FORGOT_PASSWORD_SUBMIT_LABEL')} isLoading={this.props.forgotPassword.isLoading} />
            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        forgotPassword: state.ForgotPasswordReducer

    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassowrd: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.FORGOT_PASSWORD_CHECK, dto))
        }
        , setNotification: (type, message) => {
            dispatch({ type: FORGOT_PASSWORD_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
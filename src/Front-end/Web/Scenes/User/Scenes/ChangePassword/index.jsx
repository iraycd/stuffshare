/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import ChangePasswordDTO from '../../../../../../Shared/DTO/User/ChangePasswordDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import LOGIN_ACTIONS from './actions.js';
import CommandList from '../../../../../../Shared/CommandList.js';


ChangePasswordDTO
class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = new ChangePasswordDTO();
      
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
        let validation = ChangePasswordDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);

        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    passwordRepeatHandler(event) {
        this.setState({
            repeatPassword: event.target.value
        });

        this.refreshValidation();


    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value
        });
        this.refreshValidation();
    }


    submitHanlder(event) {
        this.state.toRefresh = true;
        event.preventDefault();
        if (this.validation().length == 0) {
            this.props.changePassword(this.state).then((succ, err) => {
                console.log(succ, err)
                this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                    Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('CHANGE_PASSWORD_SUCCESS')
                )
            });


        }
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);



        return (
         
            <Form className="g-min-height-600 g-brd-around g-brd-gray-light-v3 g-pa-30  text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('CHANGEPASSWORD_FORM_HEADER')}</h5>
                    <br />
                    <Label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20">{tran.translate('CHANGEPASSWORD_FORM_TEXT')}</Label>

                </Col>

                <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PASSWORD_LABEL')} value={this.state.password} onChange={this.passwordHandler.bind(this)} field="password" validation={this.state.validation} />
                <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_REPEAT_PLACEHOLDER')} isRequired={true} label={""} value={this.state.repeatPassword} onChange={this.passwordRepeatHandler.bind(this)} field="repeatPassword" validation={this.state.validation} />


                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"} value={tran.translate('CHANGE_PASSWORD_SUBMIT_LABEL')} isLoading={this.props.changePassword.isLoading} />

            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        changePassword:state.ChangePasswordReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.CHANGE_PASSWORD, dto,))

        }
        , setNotification: (type, message) => {
            dispatch({ type: LOGIN_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
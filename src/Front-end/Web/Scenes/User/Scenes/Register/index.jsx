/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import UserRegisterInternalDTO from '../../../../../../Shared/DTO/User/UserRegisterInternalDTO.js';

class Register extends React.Component {

    constructor() {
        super();
        this.state = new UserRegisterInternalDTO();
        this.state.validation = [];
    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                //          this.validation();
            });
        }
    }

    validation() {
        let validation = UserRegisterInternalDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);

        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    nameHandler(event) {
        this.setState({
            name: event.target.value
        });

        this.refreshValidation();


    }
    surnameHandler(event) {
        this.setState({
            surname: event.target.value
        });

        this.refreshValidation();


    }
    countryHandler(event) {
        this.setState({
            country: event.target.value
        });

        this.refreshValidation();


    }
    regionHandler(event) {
        this.setState({
            region: event.target.value
        });

        this.refreshValidation();
    }
    cityHandler(event) {
        this.setState({
            city: event.target.value
        });

        this.refreshValidation();
    }
    phoneHandler(event) {
        this.setState({
            phone: event.target.value
        });

        this.refreshValidation();


    }
    birthDateHandler(event) {
        this.setState({
            birthDate: event.target.value
        });

        this.refreshValidation();


    }
    surnameHandler(event) {
        this.setState({
            surname: event.target.value
        });

        this.refreshValidation();


    }
    emailHandler(event) {
        this.setState({
            email: event.target.value
        });

        this.refreshValidation();


    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value
        });
        this.refreshValidation();
    }

    passwordRepeatHandler(event) {
        this.setState({
            passwordRepeat: event.target.value
        });
        this.refreshValidation();
    }


    submitHanlder(event) {
        this.state.toRefresh = true;
        event.preventDefault();
        //   if (this.validation().length == 0) {
        // this.props.code=this.state;

        this.props.addDictionary(this.state);

        //   }
    }

    /*
     
        this.phone = '';
        this.birthDate = '';
        this.uid = ''
        this.is_authorized = '';
        this.passwordHash = '';
        this.city = '';
        this.city_id = '';
        this.adress = '';
        this.country = '';
        this.country_id = '';
        this.longitude = '';
        this.latitude = '';
        this.relogin_require = '';
        this.refresh_token = '';
        this.language=''
    */
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        this.refreshValidation();

        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-10 text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                    <h5 className="g-color-black mb-2">{tran.translate('REGISTER_FORM_HEADER')}</h5>
                    <p className="lead "></p>
                </Col>

                <TextBox placeholder={phTrans.translate('REGISTER_EMAIL_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_EMAIL_LABEL')} value={this.state.email} onChange={this.emailHandler.bind(this)} field="email" validation={this.state.validation} />

                <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PASSWORD_LABEL')} value={this.state.password} onChange={this.passwordHandler.bind(this)} field="password" validation={this.state.validation} />
                <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_REPEAT_PLACEHOLDER')} isRequired={false} label={""} value={this.state.passwordRepeat} onChange={this.passwordRepeatHandler.bind(this)} field="passwordRepeat" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('REGISTER_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('REGISTER_SURNAME_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_SURNAME_LABEL')} value={this.state.surname} onChange={this.surnameHandler.bind(this)} field="surname" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('REGISTER_PHONE_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PHONE_LABEL')} value={this.state.phone} onChange={this.phoneHandler.bind(this)} field="phone" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('REGISTER_BIRTHDATE_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_BIRTHDATE_LABEL')} value={this.state.birthDate} onChange={this.birthDateHandler.bind(this)} field="birthDate" validation={this.state.validation} />

                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn u-btn-primary rounded-0"} value={tran.translate('REGISTER_SUBMIT_LABEL')} isLoading={this.props.codeDict.edit.isLoading} />
            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginInternal: (dto) => {
            dispatch(new BaseService().commandThunt(QueryList.User.LOG_IN_INTERNAL, dto));
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
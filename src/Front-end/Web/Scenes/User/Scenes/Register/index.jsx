/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import UserRegisterInternalDTO from '../../../../../../Shared/DTO/User/UserRegisterInternalDTO.js';
import DayPickerInputComponent from '../../../../Components/FormComponent/Components/DayPickerInputComponent/index.jsx';
import CommandList from '../../../../../../Shared/CommandList.js';
//import Map from '../../../../Components/MapComponent/Map/index.js';
//import MapMarker from '../../../../Components/MapComponent/MapMarker/index.js';
import uuidv4 from "uuid/v4";
import REGISTER_USER_ACTIONS from './actions.js';
//import MapMarkerPopup from '../../../../Components/MapComponent/MapMarkerPopup/index.js';

//console.log(ReactLeaflet);
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = new UserRegisterInternalDTO();
        this.state.validation = [];
        this.state.setLonLat = false;

        this.state.city = '';
        this.state.city_id = 0;
        this.state.adress = '';
        this.state.country = '';
        this.state.country_id = 0;
        this.state.longitude = 0;
        this.state.latitude = 0;
    }

    refreshValidation() {
        if (this.state.toRefresh) {


            setTimeout(() => {
                this.validation();
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
            name: event.target.value,
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
            birthDate: event
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
        this.setState({
            toRefresh: 1
        })
        event.preventDefault();
        if (this.validation().length == 0) {
            this.state.language = this.props.lang;
            this.state.uid = uuidv4();
            this.props.createUser(this.state).then(succ => {
                this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                    Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('CREATE_USER_SUCCESS')
                )
            }).catch(ex => {
                console.log(ex);
                this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                    Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('CREATE_USER_ERROR')
                )
            })
        }
    }




    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);





        return (

            <Form className={`g-brd-around g-brd-gray-light-v${this.props.borderClass > 0 ? this.props.borderClass : 3} g-pa-30 text-center`}>
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                    <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('REGISTER_FORM_HEADER')}</h5>
                    <p className="lead "></p>
                </Col>

                <TextBox placeholder={phTrans.translate('REGISTER_EMAIL_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_EMAIL_LABEL')} value={this.state.email} onChange={this.emailHandler.bind(this)} field="email" validation={this.state.validation} />

                <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PASSWORD_LABEL')} value={this.state.password} onChange={this.passwordHandler.bind(this)} field="password" validation={this.state.validation} />
                <TextBox type="password" placeholder={phTrans.translate('REGISTER_PASSWORD_REPEAT_PLACEHOLDER')} isRequired={false} label={""} value={this.state.passwordRepeat} onChange={this.passwordRepeatHandler.bind(this)} field="passwordRepeat" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('REGISTER_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />


                <DayPickerInputComponent placeholder={phTrans.translate('REGISTER_BIRTHDATE_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_BIRTHDATE_LABEL')} onChange={this.birthDateHandler.bind(this)} field="birthDate" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('REGISTER_PHONE_PLACEHOLDER')} isRequired={true} label={tran.translate('REGISTER_PHONE_LABEL')} value={this.state.phone} onChange={this.phoneHandler.bind(this)} field="phone" validation={this.state.validation} />


                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn  u-btn-primary g-brd-none rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase "} value={tran.translate('REGISTER_SUBMIT_LABEL')} isLoading={this.props.registerUser.isLoading} />
            </Form>

        );


    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        registerUser: state.RegisterReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.CREATE_USER, dto, null, Enums.LOADER.SET_CONTAINER_ACTION));
        }, setNotification: (type, message) => {
            dispatch({ type: REGISTER_USER_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register); 
/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import LOGIN_ACTIONS from './actions.js';


class Login extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
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
        let validation = UserLoginInternalDTO.prototype.validation(this.state);
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
            // this.props.code=this.state;
            this.state.language
            this.props.loginInternal(this.state).then((succ,err) => {

                console.log(succ,err)
                this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                    Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('LOGIN_SUCCESS')
                )
            });


        }
    }

    setTokenToLocalStorage(token, refresh_token, expired_token) {
        localStorage.token == token;
        localStorage.refresh_token = refresh_token;
    }
    /*genNewToken(logStep,uid){
        if(logStep==1)
        {
            this.props.genRefresh(uid);
        }
    }*/
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        this.refreshValidation();



        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-30  text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h5 className="g-color-black mb-2">{tran.translate('LOGIN_FORM_HEADER')}</h5>
                    <Label>{this.props.login.exception ? this.props.login.exception.message[this.props.lang] : <br />}</Label>
                </Col>
                <TextBox placeholder={phTrans.translate('LOGIN_USER_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('LOGIN_USER_NAME_LABEL')} value={this.state.email} onChange={this.emailHandler.bind(this)} field="email" validation={this.state.validation} />

                <TextBox type="password" placeholder={phTrans.translate('LOGIN_PASSWORD_PLACEHOLDER')} isRequired={true} label={tran.translate('LOGIN_PASSWORD_LABEL')} value={this.state.password} onChange={this.passwordHandler.bind(this)} field="password" validation={this.state.validation} />

                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn u-btn-primary rounded-0"} value={tran.translate('LOGIN_SUBMIT_LABEL')} isLoading={this.props.login.isLoading} />

            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        login: state.LoginReducer,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginInternal: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.LOG_IN_INTERNAL, dto, null, Enums.LOADER.SET_CONTAINER_ACTION)).then(succ => {
                localStorage.token = succ.data.token;
                localStorage.refresh_token = succ.data.refresh_token ? succ.data.refresh_token : "";
                if (!localStorage.refresh_token) {
                    dispatch(new BaseService().commandThunt(CommandList.User.GEN_REFRESH_TOKEN, { uid: succ.data.uid }, null, Enums.LOADER.SET_CONTAINER_ACTION))
                        .then(succ => {
                            return dispatch(new BaseService().commandThunt(QueryList.User.GET_REFRESH_TOKEN, { uid: succ.data.uid }, localStorage.token, Enums.LOADER.SET_CONTAINER_ACTION));
                        }).then(succ => {
                            localStorage.refresh_token = succ.data;
                            return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token));
                        }).then(succ => {
                            if (succ.data.language != localStorage.lang) {
                                localStorage.lang = succ.data.language;
                                dispatch({
                                    type: LOGIN_ACTIONS.SET_LANGUAGE,
                                    lang: localStorage.lang

                                })
                            }
                            dispatch({
                                type: LOGIN_ACTIONS.IS_AUTH,
                                dto: {
                                    refresh_token: localStorage.refresh_token,
                                    token: localStorage.token
                                }
                            })
                        })


                } else {

                    dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token)).then(succ => {
                        if (succ.data.language != localStorage.lang) {
                            localStorage.lang = succ.data.language;
                            dispatch({
                                type: LOGIN_ACTIONS.SET_LANGUAGE,
                                lang: localStorage.lang

                            })
                        }

                        dispatch({
                            type: LOGIN_ACTIONS.IS_AUTH,
                            dto: {
                                refresh_token: localStorage.refresh_token,
                                token: localStorage.token
                            }
                        })
                    });
                }
                return Promise.resolve(succ)

            }).catch(err => {
                return Promise.reject(err);
            });
        }
        , setNotification: (type, message) => {
            dispatch({ type: LOGIN_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
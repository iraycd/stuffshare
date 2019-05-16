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
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import ExternalCredentialsDTO from '../../../../../../Shared/DTO/User/ExternalCredentialsDTO.js';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.state.exception = undefined;
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
            this.props.loginInternal(this.state).then((succ, err) => {

                this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                    Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('LOGIN_SUCCESS')
                );
                const urlParams = new URLSearchParams(window.location.search);
                const redirectTo = urlParams.get('redirectTo');

                if (redirectTo) {
                    this.props.history.push(redirectTo);

                }
            }).catch(ex => {
                console.log(ex.data);
                this.setState({ exception: Object.assign({}, ex.data.error) });
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
    responseFacebook(response) {
        console.log(response);
        console.log(location.href);
        let externalDTO = new ExternalCredentialsDTO();
        externalDTO.provider = 1;
        externalDTO.token = response.accessToken;
        externalDTO.userId = response.id;
        this.props.loginByExternal(externalDTO).then(succ => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectTo = urlParams.get('redirectTo');
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('LOGIN_SUCCESS')
            );
            if (redirectTo) {
                this.props.history.push(redirectTo);

            }
        });
    }
    responseGoogle(response) {
        console.log(response);
        console.log(this.props);
        let externalDTO = new ExternalCredentialsDTO();
        externalDTO.provider = 2;
        externalDTO.token = response.accessToken;
        externalDTO.userId = response.googleId;
        this.props.loginByExternal(externalDTO).then(succ => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectTo = urlParams.get('redirectTo');
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('LOGIN_SUCCESS')
            );
            if (redirectTo) {
                this.props.history.push(redirectTo);

            }
        });
    }
    failureGoogle(response) {
        console.log(response);
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        console.log(this.state);

        return (
            <Form className={`g-brd-around g-brd-gray-light-v${this.props.borderClass > 0 ? this.props.borderClass : 3} g-pa-30  text-center`}>
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('LOGIN_FORM_HEADER')}</h5>
                    <Label>{this.state.exception ? this.state.exception.message[this.props.lang] : <br />}</Label>
                </Col>
                <TextBox placeholder={phTrans.translate('LOGIN_USER_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('LOGIN_USER_NAME_LABEL')} value={this.state.email} onChange={this.emailHandler.bind(this)} field="email" validation={this.state.validation} />

                <TextBox type="password" placeholder={phTrans.translate('LOGIN_PASSWORD_PLACEHOLDER')} isRequired={true} label={tran.translate('LOGIN_PASSWORD_LABEL')} value={this.state.password} onChange={this.passwordHandler.bind(this)} field="password" validation={this.state.validation} />


                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase "} value={tran.translate('LOGIN_SUBMIT_LABEL')} isLoading={this.props.login.isLoading} />
                <br />
                <br />
                <Button onClick={this.props.openForgotPassword.bind(this)} className={"g-color-gray-dark-v4  g-letter-spacing-1 float-right btn btn-sm u-btn-outline-darkgray g-color-white--hover g-brd-none rounded-0 g-mr-10 g-mb-15 "} >{tran.translate('LOGIN_FORGOT_PASSWOD_BTN_LABEL')}</Button>
                <br />
                <div class="d-flex justify-content-center text-center g-mb-20 g-mt-20">
                    <div className={`d-inline-block align-self-center g-width-100  g-height-1  g-bg-gray-light-v${this.props.borderClass > 0 ? this.props.borderClass : 3}`}></div>
                    <span className={`align-self-center text-uppercase  g-color-gray-dark-v2 mx-4 g-color-gray-dark-v4 g-letter-spacing-2   g-font-weight-600 g-font-size-12`}>{tran.translate('LOGIN_SOCIAL_LOGIN')}</span>
                    <div className={`d-inline-block align-self-center g-width-100 g-height-1 g-bg-gray-light-v${this.props.borderClass > 0 ? this.props.borderClass : 3}`}></div>
                </div>
                <ul class="list-inline d-inline-block g-mb-30"><li class="list-inline-item g-mr-10">
                    <FacebookLogin
                        appId="1080275872150336"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,email,user_birthday,hometown,gender,user_friends"
                        callback={this.responseFacebook.bind(this)}
                        render={renderProps => (
                            <a className="u-icon-v3 g-width-35 g-cursor-pointer g-height-35 g-font-size-16 g-color-white g-color-white--hover g-bg-facebook g-bg-gray-dark-v2--hover g-transition-0_2 g-transition--ease-in"
                                onClick={renderProps.onClick}><i class="fa fa-facebook"></i></a>
                        )}
                    />
                </li>
                    <li class="list-inline-item ">
                        <GoogleLogin
                            clientId="147564742271-2itiv8meefk578crmklrmba06tiseor4.apps.googleusercontent.com"
                            render={renderProps => (
                                <a className="u-icon-v3 g-width-35 g-cursor-pointer g-height-35 g-font-size-16 g-color-white g-color-white--hover g-bg-google-plus g-bg-gray-dark-v2--hover g-transition-0_2 g-transition--ease-in"
                                    onClick={renderProps.onClick}><i class="fa fa-google-plus"></i></a>
                            )}
                            accessType='offline'
                            onSuccess={this.responseGoogle.bind(this)}
                            onFailure={this.failureGoogle.bind(this)}
                            cookiePolicy={'single_host_origin'}
                        />
                    </li>
                </ul>

            </Form >


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
    let loginLogic = (succ) => {
        localStorage.token = succ.data.token;
        localStorage.refresh_token = succ.data.refresh_token ? succ.data.refresh_token : "";
        localStorage.expiresIn = succ.data.expiresIn;
        if (!localStorage.refresh_token) {
            return dispatch(new BaseService().commandThunt(CommandList.User.GEN_REFRESH_TOKEN, { uid: succ.data.uid }, null, Enums.LOADER.SET_CONTAINER_ACTION))
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

            return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token)).then(succ => {
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
    }
    return {
        loginInternal: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.LOG_IN_INTERNAL, dto, null, Enums.LOADER.SET_CONTAINER_ACTION)).then(succ => {
                return loginLogic(succ);
            }).catch(err => {
                return Promise.reject(err);
            });
        },
        openForgotPassword: () => {
            dispatch({
                type: LOGIN_ACTIONS.OPEN_MODAL,
                dto: {
                    open: true,
                    action: "FORGOT_PASSWORD"
                }
            });
        },
        loginByExternal: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.CREATE_USER_EXTERNAL_PROV, dto, null, Enums.LOADER.SET_CONTAINER_ACTION)).then(succ => {
                return dispatch(new BaseService().queryThunt(QueryList.User.LOGIN_BY_EXTERNAL, dto, null, Enums.LOADER.SET_CONTAINER_ACTION));
            }).then(succ => {
                return loginLogic(succ);

            }).catch(err => {
                return Promise.reject(err);
            });
        }
        , setNotification: (type, message) => {
            dispatch({ type: LOGIN_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }


    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));
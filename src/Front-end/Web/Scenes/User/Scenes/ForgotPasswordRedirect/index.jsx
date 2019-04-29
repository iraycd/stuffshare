/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import CommandList from '../../../../../../Shared/CommandList';
import UserForgotPasswordDTO from '../../../../../../Shared/DTO/User/UserForgotPasswordDTO.js';
import { Redirect } from 'react-router'
import FORGOT_PASSWORD_REDIRECT_ACTIONS from './actions.js';


class ForgotPasswordRedirect extends React.Component {

    constructor() {
        super();
        this.state = new UserForgotPasswordDTO();
        this.state.validation = [];
    }
    componentDidMount() {
        this.props.forgotPassowrd({ uid: this.props.match.params.uid }).then(succ => {
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('PASSWORD_HAS_BEEN_SEND_SUCCESS')
            )
        })
    }



    render() {
        return <Redirect to='/' />;

    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
       // forgotPassword: state.ForgotPasswordReducer

    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassowrd: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.FORGOT_PASSWORD, dto,null,Enums.LOADER.INITIAL))
        }
        , setNotification: (type, message) => {
            dispatch({ type: FORGOT_PASSWORD_REDIRECT_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordRedirect);
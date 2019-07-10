/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CommandList from '../../../../../../Shared/CommandList';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import AUTHORIZE_USER_ACTIONS from './actions.js';

class AuthorizeUser extends React.Component {

    constructor() {
        super();
    }
    componentDidMount() {
        console.log(this.props)
        this.props.authorizeUser({ uid: this.props.match.params.uid }).then(succ => {
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('AUTHORIZE_USER_SUCCESS')
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
        forgotPassword: state.ForgotPasswordReducer

    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        authorizeUser: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.AUTHORIZE_USER, dto,null,Enums.LOADER.INITIAL))
        }
        , setNotification: (type, message) => {
            dispatch({ type: AUTHORIZE_USER_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizeUser);
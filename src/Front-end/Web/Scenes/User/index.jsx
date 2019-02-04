/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from './../../../../Shared/index.js';
import { BaseService } from './../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../Components/index.js';
import UserLoginInternalDTO from '../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import QueryList from '../../../../Shared/QueryList.js';
import { USER_ACTIONS } from '../../../App/Reducers/User/actions.js';
import UserModal from './index.modal.jsx'
import { LANGUAGE_ACTIONS } from '../../../App/Reducers/Language/actions.js';



class UserHeader extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;

    }

    init() {
        this.getUserInfo()
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        this.language = '';
        this.open = false;
        if(this.props.user.isLogged){
            localStorage.setItem('lang', this.props.user.user_info.language);
            this.props.setLanguage(this.props.user.user_info.language);
        }
        switch (this.props.lang) {
            case 'us': this.language = this.tran.translate('LANG_ENGLISH_LABEL'); break;
            case 'pl': this.language = this.tran.translate('LANG_POLISH_LABEL'); break;
            default: return 'brak';

        }
    }
    setLanguageHandler(event) {
        if(this.props.user.isLogged)
        {
            this.props.setUserLanguage(event.target.getAttribute('data-tag'));
        }
        localStorage.setItem('lang', event.target.getAttribute('data-tag'));
        this.props.setLanguage(event.target.getAttribute('data-tag'));

        //window.location.reload();
    }

    getUserInfo() {
        if (this.props.user.user_info.id == undefined && localStorage.token) {
            this.props.getUserInfo();
           
        }
    }

    openModalHandler(event) {

        event.preventDefault();
        this.props.openUserModal(true, 'LOGIN');

    }

    render() {
        this.init();
       
        let userInfo = <div></div>;
        if (this.props.user.user_info.id>0) {
            userInfo = <li className="list-inline-item g-mx-4"><a onClick={this.openModalHandler.bind(this)} className="g-color-white g-color-primary--hover g-text-underline--none--hover" href="#">{`${this.props.user.user_info.name} ${this.props.user.user_info.surname}`}</a></li>
        } else {
            userInfo = <li className="list-inline-item g-mx-4"><a onClick={this.openModalHandler.bind(this)} className="g-color-white g-color-primary--hover g-text-underline--none--hover" href="#">Login</a></li>
        }

        return (
            <Col xs="auto" >
                <Col xs="auto" className=" g-pos-rel g-pb-10 g-pb-0--sm">
                    <ul className="list-inline g-overflow-hidden g-pt-1 g-mx-minus-4 mb-0">
                        <li className="list-inline-item g-mx-4">
                            <i className="icon-globe-alt g-font-size-18 g-valign-middle g-color-primary g-pos-rel g-top-minus-2 g-mr-10"></i>

                            <span href="#" id="languages-dropdown-invoker-2" className="pointer g-color-white g-color-primary--hover g-text-underline--none--hover" aria-controls="languages-dropdown-2" aria-haspopup="true" aria-expanded="false" data-dropdown-event="click" data-dropdown-target="#languages-dropdown-2" data-dropdown-type="css-animation" data-dropdown-duration="300" data-dropdown-hide-on-scroll="false" data-dropdown-animation-in="fadeIn" data-dropdown-animation-out="fadeOut">
                                {this.language}
                            </span>
                            <ul id="languages-dropdown-2" className="list-unstyled g-pos-abs g-left-0 g-bg-black g-width-160 g-pb-5 g-mt-10 g-z-index-2 u-dropdown--css-animation u-dropdown--hidden" aria-labelledby="languages-dropdown-invoker-2" >
                                <li data-tag="pl" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_POLISH_LABEL')}</li>
                                <li data-tag="us" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_ENGLISH_LABEL')}</li>
                                <li data-tag="ru" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_RUSSIA_LABEL')}</li>
                                <li data-tag="de" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_RUSSIA_LABEL')}</li>

                            </ul>
                        </li>



                        <li className="list-inline-item g-mx-4">|</li>
                        {userInfo}
                    </ul>
                    <UserModal></UserModal>

                </Col>

            </Col>
        )
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        user: state.UserReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserLanguage: (language) => {
            dispatch(new BaseService().commandThunt(CommandList.User.SET_LANGUAGE,{language:language},localStorage.token));

        },
        getUserInfo: () => {
            dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO,{},localStorage.token));

        },
        setLanguage: (lang) => {
            dispatch({
                type: LANGUAGE_ACTIONS.SET_LANGUAGE,
                lang: lang
            });
        },
        openUserModal: (open, action) => {
            dispatch({
                type: USER_ACTIONS.OPEN_WINDOW,
                dto: {
                    open: open,
                    action: action
                }
            });
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHeader);
/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import { CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from '../../../../../App/index.js';
import ModalComponent from '../../../../Components/ModalComponent/index.jsx';
import SignInModal from '../SignInModal/index.jsx';
import UserProfileModal from '../UserProfileModal/index.jsx';
import { USER_HEADER_ACTIONS } from './actions.js';



class UserHeader extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;

    }
   /* componentDidUpdate(prevProps) {
        if (this.props.auth.is_logged && this.props.lang != this.props.auth.user.language) {
            localStorage.setItem('lang', this.props.auth.user.language);
            this.props.setLanguage(this.props.auth.user.language);
        }

    }*/
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        this.language = '';
        this.open = false;

        switch (this.props.lang) {
            case 'us': this.language = this.tran.translate('LANG_ENGLISH_LABEL'); break;
            case 'pl': this.language = this.tran.translate('LANG_POLISH_LABEL'); break;
            case 'de': this.language = this.tran.translate('LANG_DEAUTSCH_LABEL'); break;
            case 'ru': this.language = this.tran.translate('LANG_RUSSIA_LABEL'); break;
            case 'fr': this.language = this.tran.translate('LANG_FRANCE_LABEL'); break;
            case 'es': this.language = this.tran.translate('LANG_SPAIN_LABEL'); break;
            case 'no': this.language = this.tran.translate('LANG_NORWEGIAN_LABEL'); break;
            case 'zh_cn': this.language = this.tran.translate('LANG_CHINESS_LABEL'); break;
           
            default: return 'brak';

        }
    }
    setLanguageHandler(event) {
        if (this.props.auth.is_logged) {
            localStorage.setItem('lang', event.target.getAttribute('data-tag'));
            this.props.setUserLanguage(event.target.getAttribute('data-tag'));
        } else {
            localStorage.setItem('lang', event.target.getAttribute('data-tag'));
            this.props.setLanguage(event.target.getAttribute('data-tag'));
        }
        //window.location.reload();
    }


    openModalHandler(event) {

        event.preventDefault();
        this.props.openUserModal(true, 'LOGIN');

    }

    render() {
        this.init();

        let userInfo = <div></div>;
        let modal = <div></div>;
let width="";
        if (this.props.auth.is_logged == true) {
            width="modal-wd-60p  g-pt-15 g-pb-5 g-px-10";
            userInfo = <li className="list-inline-item g-mx-4"><a onClick={this.openModalHandler.bind(this)} className="g-color-white g-color-primary--hover g-text-underline--none--hover" href="#">{`${this.props.auth.user.name}`}</a></li>
            modal = <UserProfileModal></UserProfileModal>;
        } else {
            width="modal-wd-50p g-pa-10";

            userInfo = <li className="list-inline-item g-mx-4"><a onClick={this.openModalHandler.bind(this)} className="g-color-white g-color-primary--hover g-text-underline--none--hover" href="#">{this.tran.translate('LABEL_LINK_LOGIN_LINK')}</a></li>
            modal = <SignInModal></SignInModal>
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
                                <li data-tag="de" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_DEAUTSCH_LABEL')}</li>
                                <li data-tag="fr" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_FRANCE_LABEL')}</li>
                                <li data-tag="es" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_SPAIN_LABEL')}</li>
                                <li data-tag="no" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_NORWEGIAN_LABEL')}</li>
                                <li data-tag="zh_cn" onClick={this.setLanguageHandler.bind(this)} className="d-block g-color-white g-color-primary--hover g-text-underline--none--hover g-py-5 g-px-20 pointer">{this.tran.translate('LANG_CHINESS_LABEL')}</li>

                            </ul>
                        </li>



                        <li className="list-inline-item g-mx-4">|</li>
                        {userInfo}
                    </ul>

                    <ModalComponent modalType={modal} classWidth={width} ></ModalComponent>
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
        auth: state.AuthReducer,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserLanguage: (language) => {
            dispatch(new BaseService().commandThunt(CommandList.User.SET_LANGUAGE, { language: language }, localStorage.token)).then(succ => {
                dispatch({
                    type: USER_HEADER_ACTIONS.SET_LANGUAGE,
                    lang: language
                });
            }

            );

        },

        setLanguage: (lang) => {
            dispatch({
                type: USER_HEADER_ACTIONS.SET_LANGUAGE,
                lang: lang
            });
        },
        openUserModal: (open, action) => {
            dispatch({
                type: USER_HEADER_ACTIONS.OPEN_MODAL,
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
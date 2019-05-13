/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Enums, CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
//import { TextBox, DropDownList, ButtonLoader } from './../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import Modal from 'react-responsive-modal'
import ForgotPassword from '../../Scenes/ForgotPassword/index.jsx';
import Register from '../../Scenes/Register/index.jsx';
import Login from '../../Scenes/Login/index.jsx';


import { CSSTransitionGroup } from 'react-transition-group';
import logo from './../../../../assets/img/logo/logo-2.png';
import UserProfileInfo from '../../Scenes/UserProfileInfo/index.jsx'
import QueryList from '../../../../../../Shared/QueryList.js';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import SetLatlng from '../../Scenes/SetLatlng/index.jsx';
import noprofilepic from './../../../../assets/img/noprofilepic.jpg'
import Img from 'react-image'
import UserInfo from '../../Scenes/UserInfo/index.jsx';
import USER_PROFILE_MODAL_ACTION from './actions.js';
import UserProfileModalTab from '../UserProfileModalTab/index.jsx';



class UserProfileModal extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;
        this.toggle = this.toggle.bind(this);
        this.state.activeTab = '1';

    }

    onOpenModal() {
        this.setState({ open: true });
    };

    onCloseModal() {
        this.props.closeWindow();
    };
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    openImage(event) {

        this.props.openLightbox(this.props.auth.user.blob_profile, [this.props.auth.user.blob_profile])
        this.props.getFullsizeImage([{ uid: this.props.auth.user.blob_profile.blob_item.uid }])
    }
    logOut(event) {
        event.preventDefault();
        this.props.logOut().then(succ => {
            this.onCloseModal();
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token")

        })

    }
    onClickMyProfile(event) {

        this.onCloseModal()

    }
    render() {
        this.init();


        let modalBody = <div></div>;

        if (this.props.auth.user.longitude == 0 && this.props.auth.user.latitude == 0) {
            return <SetLatlng></SetLatlng>
        }

        let body =
            <div>
                <Nav className="text-center nav-justified u-nav-v3-2 g-mt-15">
                    <NavItem className="nav-3-2-default-hor-left-big-icons  g-cursor-pointer navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 1 ? "active" : "")}
                            onClick={() => { this.toggle('1'); }}
                        >
                            <i class="fa fa-user d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            {this.tran.translate('PROFILE_MODAL_TAB')}
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-3-1-default-hor-left-big-icons  g-cursor-pointer navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 2 ? "active" : "")}

                            onClick={() => { this.toggle('2'); }}
                        >
                            <i class="fa fa-book d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            {this.tran.translate('SHARE_ITEMS_MODAL_TAB')}

                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-3-1-default-hor-left-big-icons  g-cursor-pointer  navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 3 ? "active" : "")}
                            onClick={() => { this.toggle('3'); }}
                        >
                            <i class="fa fa-envelope d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            {this.tran.translate('MESSAGES_MODAL_TAB')}

                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-3-1-default-hor-left-big-icons g-cursor-pointer  navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 4 ? "active" : "")}
                            onClick={() => { this.toggle('4'); }}
                        >
                            <i class="fa fa-users d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            {this.tran.translate('FRIENDS_MODAL_TAB')}

                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="g-pa-0" activeTab={this.state.activeTab}>
                    {this.state.activeTab == 1 ? <TabPane className="g-pa-0" tabId="1">
                        <UserProfileModalTab></UserProfileModalTab>
                    </TabPane> : undefined}
                    {this.state.activeTab == 2 ? <TabPane tabId="2">
                        <UserProfileModalTab></UserProfileModalTab>
                    </TabPane> : undefined}
                    {this.state.activeTab == 3 ? <TabPane tabId="3">
                        <UserProfileModalTab></UserProfileModalTab>
                    </TabPane> : undefined}
                    {this.state.activeTab == 4 ? <TabPane tabId="4">
                        <UserProfileModalTab></UserProfileModalTab>
                    </TabPane> : undefined}
                </TabContent>
            </div >;
        /*
        let body =
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className="active"
                            onClick={() => { this.toggle('1'); }}
                        >
                            USER PANEL
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            ITEMS
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            MESSAGES
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            FRIENDS
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <UserProfileInfo></UserProfileInfo>
                    </TabPane>
                </TabContent>
            </div >;
            */
        return (

            body

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        user: state.UserReducer,
        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        getFullsizeImage: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_BLOBS_BY_GUIDS, dto, null))

        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: USER_PROFILE_MODAL_ACTION.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            })

        },
        closeWindow: () => {
            dispatch({
                type: USER_PROFILE_MODAL_ACTION.CLOSE_MODAL,
                dto: {
                    open: false,
                }
            });
        },


        logOut: () => {
            return dispatch(
                new BaseService().commandThunt(CommandList.User.LOG_OUT, {}, localStorage.token)
            )
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileModal);
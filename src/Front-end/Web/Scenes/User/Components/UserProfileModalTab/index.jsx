/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, TabPane, TabContent, Nav, NavItem } from 'reactstrap';
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
import { Link, NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';



class UserProfileModalTab extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;
        this.toggle = this.toggle.bind(this);
        this.state.activeTab = '1';

    }
    componentDidMount() {
        this.props.getUserImages(
            { user_id: this.props.auth.user.id }
        );
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

        this.props.openLightbox(this.props.auth.user.blob_profile, this.props.userProfileModalTab.images)
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




        /* if (this.props.loader.BODY_PROGRESS < 100) {
             return (<BodyLoader height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
         }*/


        let img = noprofilepic;
        let uid = 0;
        let hasImg = false;
        if (this.props.auth.user.blob_profile != null) {
            img = `data:${this.props.auth.user.blob_profile.blob_thumbmail.type};base64,${this.props.auth.user.blob_profile.blob_thumbmail.blob}`
            uid = this.props.auth.user.blob_profile.blob_item.uid
            hasImg = true;
        }

        let body =
            <Container className="g-pa-5">
                <Row>
                    <Col xs="4" className="g-pr-0 g-py-5 g-pl-5">
                        <div class=" g-mb-50 g-mb-0--lg">
                            <div class="u-block-hover g-pos-rel ">
                                <figure >

                                    <Img data-tag={uid} src={img.toString()} className="img-fluid w-100 u-block-hover__main--zoom-v1 g-cursor-pointer" alt="Image Description" />

                                </figure>
                                {hasImg == true ?
                                    <figcaption onClick={this.openImage.bind(this)} class="u-block-hover__additional--fade g-bg-white-opacity-0_5 g-pa-30">
                                        <div class="u-block-hover__additional--fade u-block-hover__additional--fade-up g-flex-middle">

                                        </div>
                                    </figcaption>
                                    : undefined}
                                <span class="g-pos-abs g-bottom-0 g-right-0">
                                    <a class="hidden btn btn-sm u-btn-primary rounded-0" href="#">Użytkownik</a>
                                    <small class="d-block g-bg-black g-color-white g-pa-5">{this.props.auth.user.name}</small>
                                </span>
                            </div>

                            <div class="list-group list-group-border-0 g-mb-40">

                                <Link onClick={this.onClickMyProfile.bind(this)} to="/userAccount" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('EDIT_PROFILE_LINK')}</span>
                                </Link>


                                <Link onClick={this.logOut.bind(this)} to={"/userAccount/logOut"} className=" list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">{this.tran.translate('LOG_OUT_LINK')}</span>
                                </Link>

                            </div>


                        </div>


                    </Col>
                    <Col xs="8" className="g-pa-5">

                        <UserInfo mapHeight="200"></UserInfo>

                    </Col>
                </Row>

            </Container >

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
        auth: state.AuthReducer,
        userProfileModalTab: state.UserProfileModalTabReducer

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
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

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
)(UserProfileModalTab);
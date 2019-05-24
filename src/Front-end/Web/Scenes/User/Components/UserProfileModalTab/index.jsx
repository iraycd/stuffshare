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
import ImageProfile from '../../../../Components/ImageProfile/index.jsx';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class UserProfileModalTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;
        this.state.activeTab = '1';
        console.log(this.props.user)
        this.state.user = this.props.user;

    }
    componentDidMount() {
        this.props.getUserImages(
            { user_id: this.state.user.id }
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

        this.props.openLightbox(this.state.user.blob_profile, this.props.userProfileModalTab.images)
        this.props.getFullsizeImage([{ id: this.state.user.blob_profile.blob_item.id }])
    }

    logOut(event) {
        event.preventDefault();

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center'>
                        <h1 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('LOGOUT_CONFIRM_HEADER')}</h1>
                        <p className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('LOGOUT_CONFIRM_HEADER')}</p>
                        <button className="btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
                            onClick={() => {
                                this.props.logOut().then(succ => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("refresh_token")
                                    this.setState({
                                        logOut: 1
                                    });
                                    this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                                        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('LOGGED_OUT_SUCCESS')
                                    )
                                    this.onCloseModal();

                                })
                                onClose();

                            }}
                        >
                            {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('YES_LABEL')}
                        </button>
                        <button className="g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md" onClick={onClose}>{Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('NO_LABEL')}</button>

                    </div>
                );
            }

        });

    };
    onClickMyProfile(event) {

        this.onCloseModal()

    }
    render() {
        this.init();




        /* if (this.props.loader.BODY_PROGRESS < 100) {
             return (<BodyLoader height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
         }*/




        let body =
            <Container className="g-pa-5">
                <Row>
                    <Col xs="4" className="g-pr-0 g-py-5 g-pl-5">
                        <div class=" g-mb-50 g-mb-0--lg">
                            <ImageProfile blob_profile={this.state.user.blob_profile} default={noprofilepic} title={this.state.user.name} openImage={this.openImage.bind(this)} />


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

                        <UserInfo mapHeight="200" user={this.state.user}></UserInfo>

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
        , setNotification: (type, message) => {
            dispatch({ type: USER_PROFILE_MODAL_ACTION.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileModalTab);
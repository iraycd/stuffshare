/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from '../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from '../../../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import Modal from 'react-responsive-modal'
import Login from '../../Scenes/Login/index.jsx';
import ForgotPassword from '../../Scenes/ForgotPassword/index.jsx';
import Register from '../../Scenes/Register/index.jsx';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import noprofilepic from './../../../../assets/img/noprofilepic.jpg'
import SIGN_IN_MODAL_ACTIONS from './actions.js';
import SetLatlng from '../../Scenes/SetLatlng/index.jsx';

import { Link, NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';
import UserProfileInfo from '../../Scenes/UserProfileInfo/index.jsx';
import RemoveUser from '../../Scenes/RemoveUser/index.jsx';
import UserInfo from '../../Scenes/UserInfo/index.jsx';
import LogOut from '../../Scenes/LogOut/index.jsx';
import ChangePassword from '../../Scenes/ChangePassword/index.jsx';
import Img from 'react-image'
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import AddProfileImage from '../../Scenes/AddProfileImage/index.jsx';
import ImageLightbox from './../../../../Components/ImageLightbox/index.jsx'
import USER_ACCOUNTS_ACTION from './actions.js';


class UserAccount extends React.Component {

    constructor() {
        super();

    }
    componentDidMount() {

    }


    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }
    openImage(event) {

        this.props.openLightbox(this.props.auth.user.blob_profile, [this.props.auth.user.blob_profile])
        this.props.getFullsizeImage([{ uid: this.props.auth.user.blob_profile.blob_item.uid }])
    }

    render() {
        this.init();
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        if (this.props.loader.BODY_PROGRESS < 100) {
            return (<BodyLoader height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
        }


        let img = noprofilepic;
        let uid = 0;
        if (this.props.auth.user.blob_profile != null) {
            img = `data:${this.props.auth.user.blob_profile.blob_thumbmail.type};base64,${this.props.auth.user.blob_profile.blob_thumbmail.blob}`
            uid = this.props.auth.user.blob_profile.blob_item.uid

        }

        let body =
            <Container className="g-pa-15">

                <Row>
                    <Col xs="3" >
                        <div class=" g-mb-50 g-mb-0--lg">
                            <div class="u-block-hover g-pos-rel">
                                <figure >
                                    
                                    <Img data-tag={uid} src={img.toString()}  className="img-fluid w-100 u-block-hover__main--zoom-v1 g-cursor-pointer" alt="Image Description" />
                                
                                </figure>

                                <figcaption onClick={this.openImage.bind(this)} class="u-block-hover__additional--fade g-bg-white-opacity-0_5 g-pa-30">
                                    <div class="u-block-hover__additional--fade u-block-hover__additional--fade-up g-flex-middle">

                                    </div>
                                </figcaption>

                                <span class="g-pos-abs g-bottom-0 g-right-0">
                                    <a class="hidden btn btn-sm u-btn-primary rounded-0" href="#">Użytkownik</a>
                                    <small class="d-block g-bg-black g-color-white g-pa-5">{this.props.auth.user.name}</small>
                                </span>
                            </div>

                            <div class="list-group list-group-border-0 g-mb-40">

                                <NavLink exact strict to="/userAccount" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span> {this.tran.translate('EDIT_PROFILE_LINK')}</span>
                                </NavLink>
                                <NavLink to="/userAccount/addProfileImage" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span>  {this.tran.translate('ADD_PROFILE_IMG_LINK')}</span>
                                </NavLink>
                                <NavLink to={"/userAccount/setCoordinates"} className="  list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span> {this.tran.translate('SET_COORDINATE_LINK')}</span>
                                </NavLink>
                                <NavLink to={"/userAccount/removeAccount"} className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    {this.tran.translate('REMOVE_ACCOUNT_LINK')}
                                </NavLink>
                                <NavLink to={"/userAccount/connectSocial"} className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span>{this.tran.translate('CONNECT_SOCIAL_LINK')}</span>
                                </NavLink>
                                <NavLink to={"/userAccount/changePassword"} className=" list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span>{this.tran.translate('CHANGE_PASSWORD_LINK')}</span>
                                </NavLink>
                                <NavLink to={"/userAccount/logOut"} className=" list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span>{this.tran.translate('LOG_OUT_LINK')}</span>
                                </NavLink>

                            </div>


                        </div>


                    </Col>
                    <Col xs="9">

                        <Switch>


                            <Route exact path={"/userAccount"} component={UserInfo} />

                            <Route path={"/userAccount/setCoordinates"} component={SetLatlng} />
                            <Route path={"/userAccount/removeAccount"} component={RemoveUser} />
                            <Route path={"/userAccount/logOut"} component={LogOut} />
                            <Route path={"/userAccount/changePassword"} component={ChangePassword} />
                            <Route path={"/userAccount/addProfileImage"} component={AddProfileImage} />



                        </Switch>
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
        userAccount: state.UserAccountReducer,
        loader: state.LoaderReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {


        getFullsizeImage: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_BLOBS_BY_GUIDS, dto, null))

        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: USER_ACCOUNTS_ACTION.OPEN_LIGHTBOX,
                dto: {
                    images: images,
                    activeImage: activeImage
                }
            })

        }


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccount);
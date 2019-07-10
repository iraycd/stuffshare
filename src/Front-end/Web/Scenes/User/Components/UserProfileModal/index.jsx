/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { CommandList, Translator } from '../../../../../../Shared/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import SetLatlng from '../../Scenes/SetLatlng/index.jsx';
import UserProfileModalTab from '../UserProfileModalTab/index.jsx';
import { BaseService } from './../../../../../App/index.js';
import USER_PROFILE_MODAL_ACTION from './actions.js';





class UserProfileModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.user=this.props.auth.user

        this.open = false;
        this.toggle = this.toggle.bind(this);
        this.state.activeTab = '1';
        console.log(this.state);
        console.log(props.auth.user)

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

        this.props.openLightbox(this.state.user.blob_profile, [this.state.user.blob_profile])
        this.props.getFullsizeImage([{ uid: this.state.user.blob_profile.blob_item.uid }])
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
                            <span className="g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">{this.tran.translate('PROFILE_MODAL_TAB')}</span>
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-3-1-default-hor-left-big-icons  g-cursor-pointer navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 2 ? "active" : "")}

                            onClick={() => { this.toggle('2'); }}
                        >
                            <i class="fa fa-book d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            <span className="g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('SHARE_ITEMS_MODAL_TAB')}</span>

                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-3-1-default-hor-left-big-icons  g-cursor-pointer  navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 3 ? "active" : "")}
                            onClick={() => { this.toggle('3'); }}
                        >
                            <i class="fa fa-envelope d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            <span className="g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('MESSAGES_MODAL_TAB')}</span>


                        </NavLink>
                    </NavItem>
                    <NavItem className="nav-3-1-default-hor-left-big-icons g-cursor-pointer  navbar-hover">
                        <NavLink className={"btn btn-md btn-block rounded-0 u-btn-outline-lightgray show " + (this.state.activeTab == 4 ? "active" : "")}
                            onClick={() => { this.toggle('4'); }}
                        >
                            <i class="fa fa-users d-block g-font-size-25 u-tab-line-icon-pro"></i>
                            <span className="g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('FRIENDS_MODAL_TAB')}</span>


                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="g-pa-0" activeTab={this.state.activeTab}>
                    {this.state.activeTab == 1 ? <TabPane className="g-pa-0" tabId="1">
                        <UserProfileModalTab user={this.state.user}></UserProfileModalTab>
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
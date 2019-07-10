/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { Col, Container, Row } from 'reactstrap';
import { Translator } from '../../../../../../Shared/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { BaseService } from '../../../../../App/index.js';
import ImageProfile from '../../../../Components/ImageProfile/index.jsx';
import LinkAuth from '../../../../Components/LinkAuth/index.jsx';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import AddProfileImage from '../../Scenes/AddProfileImage/index.jsx';
import ChangePassword from '../../Scenes/ChangePassword/index.jsx';
import LogOut from '../../Scenes/LogOut/index.jsx';
import RemoveUser from '../../Scenes/RemoveUser/index.jsx';
import SetLatlng from '../../Scenes/SetLatlng/index.jsx';
import UserInfo from '../../Scenes/UserInfo/index.jsx';
import PRIVS_ENUM from './../../../../../App/Privileges/privsEnum.js';
import noprofilepic from './../../../../assets/img/noprofilepic.jpg';
import USER_ACCOUNTS_ACTION from './actions.js';





class UserAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.images = [];
        this.state.user = {};
        this.tran = [];
        this.phTrans = [];
        this.state.isLoading = false;

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id != nextProps.match.params.id) {
            this.update(nextProps)
        }
        else if( this.props.userAccount.images.length!=nextProps.userAccount.images.length)
        {
            this.setState({
                images:nextProps.userAccount.images
            })
        }
        else if( this.props.auth.user.blob_id!=nextProps.auth.user.blob_id)
        {
            this.state.user = nextProps.auth.user;
        }
    }
    update(props) {
        this.setState({ isLoading: true });

        let userId = props.match.params.id ? props.match.params.id : this.props.auth.user.id;
        if (props.match.params.id) {

            let user = {};
            this.props.getUserInfo({ id: userId }).then(succ => {
                user = succ.data;

                return this.props.getUserImages(
                    { user_id: userId }
                )
            }).then(succ => {
                this.setState({
                    user: user,
                    isLoading: false,
                    images: succ.data
                })
            });

        } else {
            this.props.getUserImages(
                { user_id: userId }
            ).then(succ => {
                this.setState({
                    images: succ.data,
                    user: this.props.auth.user,
                    isLoading: false
                })
            })
        }
    }
    componentWillMount(prevProps, prevState) {
        this.setState({ isLoading: true });

        let userId = this.props.match.params.id ? this.props.match.params.id : this.props.auth.user.id;
        if (this.props.match.params.id) {

            let user = {};
            this.props.getUserInfo({ id: userId }).then(succ => {
                user = succ.data;

                return this.props.getUserImages(
                    { user_id: userId }
                )
            }).then(succ => {
                this.setState({
                    user: user,
                    isLoading: false,
                    images: succ.data
                })
            });

        } else {
            this.props.getUserImages(
                { user_id: userId }
            ).then(succ => {
                this.setState({
                    images: succ.data,
                    user: this.props.auth.user,
                    isLoading: false
                })
            })
        }

    }


    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        this.phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


    }
    openImage(event) {

        this.props.openLightbox(this.state.user.blob_profile, this.state.images)
        this.props.getFullsizeImage([{ id: this.state.user.blob_profile.blob_item.id }])
    }

    render() {
        this.init();

        if (this.state.isLoading == true) {
            return (<BodyLoader zIndex={3} height="800px" size="100px" />);
        }

        let body =
        <CSSTransitionGroup transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
            <Container className="g-py-15">

                <Row>
                    <Col xs="3" className="g-pr-5 g-pl-0" >
                        <div class=" g-mb-50 g-mb-0--lg">
                            <ImageProfile blob_profile={this.state.user.blob_profile} default={noprofilepic} title={this.state.user.name} openImage={this.openImage.bind(this)} />


                            <div class="list-group list-group-border-0 g-mb-40">

                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_OWNER]} exact strict to="/userAccount" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('EDIT_PROFILE_LINK')}</span>
                                </LinkAuth>
                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_NOT_OWNER]} exact strict to={`/user/${this.state.user.id}`} className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('GO_TO_USER_PROFILE_LINK')}</span>
                                </LinkAuth>
                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_OWNER]} to="/userAccount/addProfileImage" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">  {this.tran.translate('ADD_PROFILE_IMG_LINK')}</span>
                                </LinkAuth>
                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_OWNER]} to={"/userAccount/setCoordinates"} className="  list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('SET_COORDINATE_LINK')}</span>
                                </LinkAuth>
                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_OWNER]} to={"/userAccount/removeAccount"} className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">{this.tran.translate('REMOVE_ACCOUNT_LINK')}</span>
                                </LinkAuth>

                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_OWNER]} to={"/userAccount/changePassword"} className=" list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">{this.tran.translate('CHANGE_PASSWORD_LINK')}</span>
                                </LinkAuth>
                                <LinkAuth user_id={this.state.user.id} privs={[PRIVS_ENUM.IS_OWNER]} to={"/userAccount/logOut"} className=" list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">{this.tran.translate('LOG_OUT_LINK')}</span>
                                </LinkAuth>

                            </div>


                        </div>


                    </Col>
                    <Col xs="9" className="g-px-5 g-pr-0">

                        <Switch>

                            <Route path={"/user/:id"} component={() => { return <UserInfo user={this.state.user}></UserInfo> }} />
                            <Route exact path={"/userAccount"} component={() => { return <UserInfo user={this.state.user}></UserInfo> }} />
                            <Route path={"/userAccount/setCoordinates"} component={SetLatlng} />
                            <Route path={"/userAccount/removeAccount"} component={RemoveUser} />
                            <Route path={"/userAccount/logOut"} component={LogOut} />
                            <Route path={"/userAccount/changePassword"} component={ChangePassword} />
                            <Route path={"/userAccount/addProfileImage"} component={()=>{return <AddProfileImage images={this.state.images}></AddProfileImage>} }/>



                        </Switch>
                    </Col>
                </Row>
            </Container >
            </CSSTransitionGroup>
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

        },
        refreshSet: (refresh) => {
            return dispatch({
                type: USER_ACCOUNTS_ACTION.SET_REFRESH_ACTION,
                dto: {
                   refresh:refresh
                }
            })

        },
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },
        getUserInfo: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, dto, null))

        },

    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccount));
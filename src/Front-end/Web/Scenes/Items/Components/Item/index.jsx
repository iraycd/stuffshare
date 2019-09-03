/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from '../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from '../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import Modal from 'react-responsive-modal'

import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import noprofilepic from './../../../../assets/img/noprofilepic.jpg'

import { Link, NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';

import Img from 'react-image'
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import ImageLightbox from './../../../../Components/ImageLightbox/index.jsx'
import ITEM_ACTION from './actions.js';
import ImageProfile from '../../../../Components/ImageProfile/index.jsx';
import CategoryOptionTempFormMapper from '../../../Categories/Components/CategoryOptionTempMapper/CategoryOptionTempFormMapper.jsx';



class Item extends React.Component {

    constructor() {
        super();

    }
    componentDidMount() {
        this.props.getUserImages(
            { user_id: this.props.auth.user.id }
        );
    }

    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }
    openImage(event) {

        this.props.openLightbox(this.props.auth.user.blob_profile, this.props.userAccount.images)
        this.props.getFullsizeImage([{ uid: this.props.auth.user.blob_profile.blob_item.uid }])
    }
    submit()
    {
        
    }

    render() {
        this.init();
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        if (this.props.loader.BODY_PROGRESS < 100) {
            return (<BodyLoader zIndex={3} height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
        }
        //  if (this.props.userAccount.getImagesIsLoading == true) {
        //      return (<BodyLoader zIndex={3} height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
        //  }




        let body =
            <Container className="g-py-15">

                <Row>
                    <Col xs="3" className="g-pr-5 g-pl-0" >
                        <div class=" g-mb-50 g-mb-0--lg">
                            <ImageProfile blob_profile={this.props.auth.user.blob_profile} default={noprofilepic} title={this.props.auth.user.name} openImage={this.openImage.bind(this)} />


                            <div class="list-group list-group-border-0 g-mb-40">

                                <NavLink exact strict to="/item/1" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('EDIT_PROFILE_LINK')}</span>
                                </NavLink>
                                <NavLink to="/item/edit/1" className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">  {this.tran.translate('ADD_PROFILE_IMG_LINK')}</span>
                                </NavLink>
                                <NavLink to={"/item/delete/1"} className="  list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> {this.tran.translate('SET_COORDINATE_LINK')}</span>
                                </NavLink>
                                <NavLink to={"/itemList"} className="list-group-item list-group-item-action justify-content-between u-link-v5     g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase">{this.tran.translate('REMOVE_ACCOUNT_LINK')}</span>
                                </NavLink>


                            </div>


                        </div>


                    </Col>
                    <Col xs="9" className="g-px-5 g-pr-0">

                        <Switch>






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

        },
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);
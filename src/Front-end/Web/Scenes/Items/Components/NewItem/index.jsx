/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from '../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader, TextArea } from '../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import Modal from 'react-responsive-modal'

import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import noprofilepic from './../../../../assets/img/noprofilepic.jpg'

import { Link, NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';

import Img from 'react-image'
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import ImageLightbox from './../../../../Components/ImageLightbox/index.jsx'
import NEW_ITEM_ACTION from './actions.js';
import ImageProfile from '../../../../Components/ImageProfile/index.jsx';

import ItemDTO from './../../../../../../Shared/DTO/Item/ItemDTO.js'

class NewItem extends React.Component {

    constructor() {
        super();
        this.state = new ItemDTO();
        this.state.validation = [];

    }
    componentDidMount() {

    }

    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }


    nameHandler(event) {
        this.setState({
            name: event.target.value

        });
        this.refreshValidation();
    }
    openImage(event) {

        this.props.openLightbox(this.props.auth.user.blob_profile, this.props.userAccount.images)
        this.props.getFullsizeImage([{ uid: this.props.auth.user.blob_profile.blob_item.uid }])
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
                <Col>
                    <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                        <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{this.tran.translate('NEW_ITEM_HEADER')}</h5>
                        <p className="lead "></p>
                    </Col>

                    <TextBox placeholder={phTrans.translate('ITEM_NAME_PLACEHOLDER')} isRequired={true} label={this.tran.translate('ITEM_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />
                    <TextArea placeholder={phTrans.translate('ITEM_DESCRIPTION_PLACEHOLDER')} isRequired={true} label={this.tran.translate('ITEM_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />
                    <TextBox placeholder={phTrans.translate('ITEM_TAG_PLACEHOLDER')} isRequired={true} label={this.tran.translate('ITEM_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />
                    <span class="u-label g-letter-spacing-1 g-font-weight-500 text-center g-bg-primary g-mr-10 g-mb-15">
                        <i class="fa fa-bookmark g-mr-3"></i>
                        At vero eos et sunt
                    </span>
                  
                </Col>
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
)(NewItem);
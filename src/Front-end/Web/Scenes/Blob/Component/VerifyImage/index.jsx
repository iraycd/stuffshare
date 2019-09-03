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
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import noprofilepic from './../../../../assets/img/noprofilepic.jpg'

import { Link, NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';

import Img from 'react-image'
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import BlobToVerifiedDTO from './../../../../../../Shared/DTO/Blob/BlobToVerifiedDTO.js'
import VERIFY_IMAGE_ACTION from './actions.js';

class VerifyImage extends React.Component {

    constructor() {
        super();
        this.state = new BlobToVerifiedDTO();

    }

    componentDidMount() {
        this.props.getUnverifiedImages(
            this.state
        );
    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }

    removeImage(event) {
        this.props.removeImage({ id: event.currentTarget.getAttribute('data-tag') })
    }
    verifyImage(event) {
        this.props.verifyBlob({ id: event.currentTarget.getAttribute('data-tag') })
    }

    
    openImage(event) {

        this.props.openLightbox(this.props.auth.user.blob_profile, [this.props.auth.user.blob_profile])
        this.props.getFullsizeImage([{ is: this.props.auth.user.blob_profile.blob_item.id }])
    }
    clickImageHandler(event) {

        this.props.verifyImage.images.forEach(item => {
            if (item.id == event.currentTarget.getAttribute('data-tag')) {

                this.props.openLightbox(item, this.props.verifyImage.images)
                this.props.getFullsizeImage([{ id: item.blob_item.id }])
                /*   this.props.getFullsizeImage([{ uid: item.blob_item.uid }]).then(succ=>{
                       console.log(succ);
                       item.blob_item=succ.data[0];
                       this.props.openLightbox(item, this.props.addProfile.images)
   
   
                   })
   
                   */

            }
        })

    }
    render() {
        this.init();
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);



        if (this.props.verifyImage.getImagesIsLoading == true) {
            return (<BodyLoader zIndex={3} height="500px" size="100px" progress={50} />);
        }


        let imgList = this.props.verifyImage.images.map((item, index) => {
            let brdColor = "g-brd-gray-light-v4--hover";
            if (index == 0) {
                brdColor = "g-brd-red-light-v4--hover"
            }
            let img = `data:${item.blob_thumbmail.type};base64,${item.blob_thumbmail.blob}`
            return (
                <Col xs="4">
                    <div class={"g-brd-around g-brd-gray-light-v4  g-mb-25  " + brdColor}>


                        <div class="js-fancybox d-block u-block-hover " target="_blank">
                            <span data-tag={item.id} onClick={this.removeImage.bind(this)} class="g-z-index-3 u-icon-v3 u-icon-size--xs g-bg-white g-color-black g-rounded-50x g-cursor-pointer g-pos-abs g-top-10 g-right-10">
                                <i class="fa fa-remove"></i>
                            </span>
                            <span data-tag={item.id}  onClick={this.verifyImage.bind(this)} class="g-z-index-3 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-10 g-right-10">{this.tran.translate('SET_AS_VERIFIED')}
                            </span> 
                            {item.item_id>0?<a href="#" class="g-z-index-3 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-30 g-right-10">{this.tran.translate('GO_TO_ITEM')}
                            </a> :<span></span>}
                            {item.user_id>0?<a href="#" class="g-z-index-3 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-50 g-right-10">{"USER: " +item.user_id}
                            </a> :<span></span>}
                            <span data-tag={item.id} onClick={this.clickImageHandler.bind(this)} class={  " js-fancybox d-block u-block-hover u-block-hover--scale-down"} href="smooth-parallax-scroll/index.html" >
                                <Img src={img.toString()} className={"img-fluid u-block-hover__main u-block-hover__img"} />

                            </span>
                        </div>

                    </div>

                </Col>)

        })

        console.log(this.props.verifyImage)

        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-10 text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h2 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{this.tran.translate('BLOB_VERIFY_IMAGE_HEADER')}</h2>
                </Col>
                    
                </Col>
                <Container>
                    <Row>
                        {imgList}
                    </Row>
                </Container>

            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        verifyImage: state.VerifyImageReducer,
        loader: state.LoaderReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {


        getUnverifiedImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_UNVERIFIED, dto, null))

        },
        removeImage: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Blob.REMOVE_BLOB, dto, null))

        }, 
        verifyBlob: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Blob.VERIFY_IMAGE, dto, null))

        }, 
         getFullsizeImage: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_BLOBS_BY_GUIDS, dto, null))

        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: VERIFY_IMAGE_ACTION.OPEN_LIGHTBOX,
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
)(VerifyImage);
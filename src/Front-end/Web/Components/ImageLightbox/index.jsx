/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import Modal from 'react-responsive-modal'
import { CSSTransitionGroup } from 'react-transition-group';
import LIGHTBOX_ACTIONS from './actions.js';
import Img from 'react-image'
import QueryList from '../../../../Shared/QueryList.js';
import { BaseService } from './../../../App/index'
import BodyLoader from '../Loader/BodyLoader/index.jsx';


class ImageLightbox extends React.Component {

    constructor() {
        super();
        this.open = false;
        this.isLoading = false;

    }

    thumbmailClickHandler(event) {
        this.props.getImage([{ uid: event.currentTarget.getAttribute('data-tag') }])
    }
    onOpenModal() {
        this.setState({ open: true });
    };

    onCloseModal() {
        this.props.closeWindow();
    };

    init() {
        this.open = false;
    }
    closeLightboxHandler(event) {
        this.props.closeLightbox(false);
    }
    render() {


        if (this.props.lightbox.open == false) {
            return <span></span>
        }
        let img = this.props.lightbox.activeImage ?
            `data:${this.props.lightbox.activeImage.blob_item.type};base64,${this.props.lightbox.activeImage.blob_item.blob}` :
            ''
        let imgReact = img != null ? <img style={{ maxWidth: '1100px', maxHeight: '900px' }} src={img} /> : <span></span>

        let lightboxBody = !this.props.lightbox.isLoading ?
            (<Col onClick={this.closeLightboxHandler.bind(this)} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                display: 'flex'


            }} xs="12">
                {img != null ? <img style={{ maxWidth: '1100px', maxHeight: '900px' }} src={img} /> : <span></span>}</Col>)
            : <BodyLoader onClick={this.closeLightboxHandler.bind(this)} white="true" height="100%" size="130px" />

        if (this.props.lightbox.imageList.length > 1) {
            lightboxBody =
                <Row className="ligbboxBody">
                    {!this.props.lightbox.isLoading ?
                        (
                            <Col onClick={this.closeLightboxHandler.bind(this)} style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                                display: 'flex'


                            }} xs="10">
                                {imgReact}
                            </Col>
                        ) : <BodyLoader  onClick={this.closeLightboxHandler.bind(this)} white="true"  height="100%" size="130px" />}

                    <Col xs="2" className="lighboxRight g-pa-10">

                        < Row >
                            {
                                this.props.lightbox.imageList.map(item => {
                                    let actualId = this.props.lightbox.activeImage ? this.props.lightbox.activeImage.id : 0;
                                    return <div key={item.blob_thumbmail.uid} class="col-md-6  g-ma-0 g-pa-0 g-pl-10 ">
                                        <div class="g-brd-around g-brd-gray-light-v4--hover">
                                            <span data-tag={item.blob_item.uid} className={"js-fancybox d-block u-block-hover u-block-hover--scale-down "} href="#" onClick={this.thumbmailClickHandler.bind(this)} data-fancybox="lightbox-gallery--17" data-src="../../assets/img-temp/400x270/img1.jpg" data-animate-in="bounceInDown" data-animate-out="bounceOutDown" data-speed="1000" data-overlay-blur-bg="true" data-caption="Lightbox Gallery">
                                                <Img src={`data:${item.blob_thumbmail.type};base64,${item.blob_thumbmail.blob}`} className={"img-fluid  u-block-hover__img " + (actualId == item.id ? "" : "u-block-hover__main--grayscale")} />
                                            </span>
                                        </div>
                                    </div>


                                })
                            }
                        </Row>
                    </Col>
                </Row>

        }
        let body =
            (
                <div>
                    <div className="lightboxContainer" onClick={this.closeLightboxHandler.bind(this)}></div>
                    <Container className="ligbboxBody" >

                        {lightboxBody}


                    </Container>
                </div>
            )

        return (

            body

        );
    }
}


const mapStateToProps = (state) => {

    return {


        lightbox: state.ImageLightboxReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        /*   openLightbox: (open, action) => {
               dispatch({
                   type: LIGHTBOX_ACTIONS.OPEN_MODAL,
                   dto: {
                       open: open,
                       action: action
                   }
               });
           },*/
        getImage: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_BLOBS_BY_GUIDS, dto, null))

        },
        closeLightbox: () => {
            dispatch({
                type: LIGHTBOX_ACTIONS.CLOSE_LIGHTBOX,
                dto: {
                    open: false,
                }
            });
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageLightbox);
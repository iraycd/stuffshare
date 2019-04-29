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



class ImageLightbox extends React.Component {

    constructor() {
        super();
        this.open = false;

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
        let body =
            (
                <div>
                    <div className="lightboxContainer" onClick={this.closeLightboxHandler.bind(this)}></div>
                    <Container className="ligbboxBody" >
                        <Col onClick={this.closeLightboxHandler.bind(this)} style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            alignContent: 'center',
                            display: 'flex'


                        }} xs="9"><img style={{ maxWidth: '800px', maxHeight: '900px' }} src="https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/55869522_2193080720760912_3627980156494151680_n.jpg?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=be74901ac75dd3ae9a32435b540d26ac&oe=5D30EE4D" /></Col>
                        <Col xs="2" className="lighboxRight g-pa-10">
                            <Row>
                                {this.props.lightbox.imageList.map(item => {
                                    return <div class="col-md-6  g-ma-0 g-pa-0 ">
                                        <div class="g-brd-around g-brd-gray-light-v4--hover">
                                            <a class="js-fancybox d-block u-block-hover u-block-hover--scale-down" href="javascript:;" data-fancybox="lightbox-gallery--17" data-src="../../assets/img-temp/400x270/img1.jpg" data-animate-in="bounceInDown" data-animate-out="bounceOutDown" data-speed="1000" data-overlay-blur-bg="true" data-caption="Lightbox Gallery">
                                                <Img src={`data:${item.blob_thumbmail.type};base64,${item.blob_thumbmail.blob}`} class="img-fluid u-block-hover__main--grayscale u-block-hover__img" />
                                            </a>
                                        </div>
                                    </div>


                                })}
                            </Row>
                        </Col>
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
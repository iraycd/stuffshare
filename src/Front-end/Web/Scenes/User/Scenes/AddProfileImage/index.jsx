/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import logo from './../../../../assets/img/logo/logo-2.png';
import CommandList from '../../../../../../Shared/CommandList.js';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import Img from 'react-image'
import noprofilepic from './../../../../assets/img/noprofilepic.jpg'
import BlobBase64 from './../../../../../../Shared/DTO/Blob/BlobBase64DTO.js'
import uuidv4 from "uuid/v4";
import ADD_PROFILE_IMAGE_ACTIONS from './actions.js';



class AddProfileImage extends React.Component {

    constructor() {
        super();
        this.state = {
            file: null

        };
    }

    componentDidMount() {
        this.props.getUserImages(
            { user_id: this.props.auth.user.id }
        ).then(succ => {
            this.props.openLightbox(succ.data[0], succ.data)
        })
    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }

    removeImage(event) {
        this.props.removeImage({ id: event.currentTarget.getAttribute('data-tag') })
    }
    uploadClick(event) {
        this.refs.fileUploader.click();
    }
    handleChange(e) {

        // get the files
        let files = e.target.files;

        // Process each file
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {

            let file = files[i];

            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {

                // Make a fileInfo Object
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };

                // Push it to the state
                allFiles.push(fileInfo);

                // If all files have been proceed
                if (allFiles.length == files.length) {
                    // Apply Callback function
                    this.setState({
                        file: allFiles[0]
                    })//this.props.onDone(allFiles[0]);

                }

            } // reader.onload

        } // for

    }
    uploadImage(event) {

        let dto = new BlobBase64();
        dto.uid = uuidv4();
        dto.blob = this.state.file.base64.split('base64,')[1];
        dto.type = this.state.file.type;
        this.props.uploadImage(
            dto
        ).then(succ => {
            this.setState({
                file: null
            })
            this.props.getUserImages(
                { user_id: this.props.auth.user.id }
            )
        })

    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        let profId = this.props.auth.user.blob_profile ? this.props.auth.user.blob_profile.id : 0

        if (this.props.addProfile.getImagesIsLoading == true) {
            return (<BodyLoader height="500px" size="70px" progress={50} />);
        }


        let imgList = this.props.addProfile.images.map((item, index) => {
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
                            {item.status == 1 && item.id != profId ? <a href="#" class="g-z-index-3 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-10 g-right-10">{tran.translate('SET_AS_PROFILE_IMAGE')}
                            </a> : <span></span>}

                            <a href="#" class={(item.status == 0 ? "u-bg-overlay u-bg-overlay--v1 g-bg-black-opacity-0_5--after" : "") + " js-fancybox d-block u-block-hover u-block-hover--scale-down"} href="smooth-parallax-scroll/index.html" >
                                <Img src={img.toString()} className={"img-fluid u-block-hover__main u-block-hover__img"} />
                                {item.status == 0 ? <span class="u-bg-overlay__inner g-color-white g-pos-abs g-left-20 g-bottom-20">
                                    {tran.translate('IMAGE_NOT_VERIFIED')}
                                </span> : <span></span>}
                            </a>
                        </div>

                    </div>

                </Col>)

        })

        if (imgList.length < 5) {
            imgList.push(<Col xs="4">

                <div class={"g-brd-around g-brd-gray-light-v4  g-mb-25"}>


                    <div class="js-fancybox d-block u-block-hover " >

                        <span onClick={this.uploadClick.bind(this)} class="g-pa-10 js-fancybox d-block u-block-hover u-block-hover--scale-down"  >
                            {this.state.file == null ?
                                <Img src={noprofilepic} className={"img-fluid u-block-hover__main u-block-hover__img"} />
                                : <Img src={this.state.file.base64} className={"img-fluid u-block-hover__main u-block-hover__img"} />
                            }
                            {this.state.file == null ? <span class="g-color-black g-font-size-16 u-bg-overlay__inner g-pos-abs g-left-15 g-bottom-10">
                                {tran.translate('UPLOAD_IMAGE_LABEL')}
                            </span>
                                : <span></span>}
                            {this.state.file == null ? <span class="u-block-hover__additional--fade g-bg-black-opacity-0_8 g-color-white">
                                <i class="hs-icon hs-icon-plus g-absolute-centered g-font-size-25"></i>
                            </span> : <span></span>}
                        </span>
                        {this.state.file != null ? <a href="#" onClick={this.uploadImage.bind(this)} class="g-z-index-3 btn btn-xs u-btn-primary g-mr-10 g-mb-15 g-pos-abs g-bottom-10 g-right-10">{tran.translate('UPLOAD_IMAGE_BTN')}
                        </a>
                            : <span></span>}

                    </div>
                </div>
                <input type="file"
                    ref="fileUploader" className=" hidden"
                    onChange={this.handleChange.bind(this)} />

            </Col>)
        }

        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-10 text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                    <h5 className="g-color-black mb-3">{tran.translate('USER_IMAGE_PROFILE_HEADER')}</h5>
                    <p className="lead "></p>
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
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        addProfile: state.AddProfileImageReducer,
        loader: state.LoaderReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },
        removeImage: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Blob.REMOVE_BLOB, dto, null))

        },
        uploadImage: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Blob.UPLOAD_IMAGE, dto, null))

        },
        openLightbox: (activeImage, images) => {
            return dispatch({
                type: ADD_PROFILE_IMAGE_ACTIONS.OPEN_LIGHTBOX,
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
)(AddProfileImage);
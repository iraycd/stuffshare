/*
    ./client/components/App.jsx
*/

import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux';
import { Col, Container, Row, Label } from 'reactstrap';
import { Translator } from '../../../../../../Shared/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { BaseService } from '../../../../../App/index.js';
import { TextArea, TextBox } from '../../../../Components/index.js';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import CategoryTreePreview from '../../../Categories/Scenes/CategoryTreePreview/index.jsx';
import ItemDTO from './../../../../../../Shared/DTO/Item/ItemDTO.js';
import CategoryOptionTempFormMapper from '../../../Categories/Components/CategoryOptionTempMapper/CategoryOptionTempFormMapper.jsx';







class NewOfferItem extends React.Component {

    constructor() {
        super();
        this.state = new ItemDTO();
        this.state.validation = [];
        this.state.categoryId = 0;

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

    onClickTree(event) {
        console.log(event.currentTarget.getAttribute('data-name'))
        if (this.state.categoryId == 0) {
            this.props.getCategoryOptions(event.currentTarget.getAttribute('data-key')).then(succ => {
                console.log(succ);
            });

            this.setState({
                categoryId: event.currentTarget.getAttribute('data-key'),
                categoryName: event.currentTarget.getAttribute('data-name')

            });

        } else {
            let categoryId = event.currentTarget.getAttribute('data-key');
            let categoryName = event.currentTarget.getAttribute('data-name')

            confirmAlert({
                onClickOutside: () => {
                    this.setState(
                        {
                            loading: false
                        }
                    )
                },
                onKeypressEscape: () => {
                    this.setState(
                        {
                            loading: false
                        }
                    )
                },
                customUI: ({ onClose }) => {
                    return (
                        <div className='g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center'>
                            <h1 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('CATEGORY_NEW_CHANGE_CATEGORY_CONFIRM_HEADER')}</h1>
                            <p className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('CATEGORY_NEW_CHANGE_CATEGORY_TEXT_CONFIRM', ...[this.state.categoryName, categoryName]) + " "} </p>
                            <button className="btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
                                onClick={() => {
                                    this.setState({
                                        categoryId: categoryId,
                                        categoryName: categoryName
                                    });
                                    this.props.getCategoryOptions(categoryId);
                                    onClose();
                                }}
                            >
                                {Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('YES_LABEL')}
                            </button>
                            <button className="g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md" onClick={() => {

                                onClose()
                            }}>{Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('NO_LABEL')}</button>

                        </div>
                    );
                }

            });
        }
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
            <Container  className="g-pa-30 g-mb-30">
                <Row>
                    <Col xs="5">

                        <CategoryTreePreview setOnlyLeaf={true} categoryId={this.state.categoryId} onClick={this.onClickTree.bind(this)}></CategoryTreePreview>
                    </Col>
                    <Col xs="7">
                        <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                            <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{this.tran.translate('NEW_ITEM_HEADER')}</h5>
                            {this.state.categoryId != 0 ? (<Label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20">{this.tran.translate('NEW_ITEM_SELL_CATEGORY_SET_HEADER', ...[this.state.categoryName])}</Label>) : <span></span>}
                        </Col>

                        <TextBox placeholder={phTrans.translate('ITEM_NAME_PLACEHOLDER')} isRequired={true} label={this.tran.translate('ITEM_NAME_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />
                        <TextArea placeholder={phTrans.translate('ITEM_DESCRIPTION_PLACEHOLDER')} isRequired={true} label={this.tran.translate('ITEM_DESCRIPTION_LABEL')} value={this.state.name} onChange={this.nameHandler.bind(this)} field="name" validation={this.state.validation} />
                        {
                            this.props.offerItem.catOptions.map(item => {
                                return <CategoryOptionTempFormMapper catOption={item} onChange={(event) => {
                                    console.log(event.currentTarget.value);
                                    console.log(item.id);
                                    
                                }}></CategoryOptionTempFormMapper>
                            })
                        }

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
        loader: state.LoaderReducer,
        offerItem: state.NewOfferItemReducer

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
        getCategoryOptions: (category_id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, { id: category_id }));

        },
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewOfferItem);
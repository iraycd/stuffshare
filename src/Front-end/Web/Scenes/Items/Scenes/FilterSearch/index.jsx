/*
    ./client/components/App.jsx
*/

import 'leaflet/dist/leaflet.css';
import React from 'react';
import { geolocated } from 'react-geolocated';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommandList from '../../../../../../Shared/CommandList.js';
import { Translator } from '../../../../../../Shared/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { BaseService } from '../../../../../App/index.js';
import SearchItemDTO from './../../../../../../Shared/DTO/Item/SearchItemDTO.js';
import { Col } from 'reactstrap'
import Collapsible from 'react-collapsible';

const queryString = require('query-string');






class FilterSearch extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.state.search = new SearchItemDTO()
        this.state.zoom = 13
        this.state.validation = [];
        this.state.latitude = 0;
        this.state.longitude = 0;
        this.state.result = [];
        this.state.radius = 1000;
        this.state.categoriesList = []

    }
    showSettings(event) {
        event.preventDefault();

    }
    componentDidMount() {
        this.props.getCategories({ parent: '_ROOT' }).then(succ => {
            this.setState({
                categoriesList: succ.data
            })
        })

    }

    goToUser(event) {
        this.props.history.push('/user/' + event.target.getAttribute('data-tag'));


    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);


    }


    showValue(item) {
        console.log(item)
        if (item.category_link.catOption.cat_opt.type == "SELECT") {
            return this.selectValue(item);
        }
        else if (item.category_link.catOption.cat_opt.type == "MULTI_SELECT") {
            return this.selectValue(item);

        }
        else if (item.category_link.catOption.cat_opt.type == "SINGLE") {
            return this.singleValue(item);
        }
        else if (item.category_link.catOption.cat_opt.type == "GEOCOORDINATE") {
            return "TO_DOOOOO"
        }
        else if (item.category_link.catOption.cat_opt.type == "BETWEEN") {
            return "TO_DOOOOO"
        }
        else if (item.category_link.catOption.cat_opt.type == "IMAGE") {
            return "TO_DOOOOO"
        } else {
            ; return item.value;
        }
    }
    singleValue(item) {
        return item.value;
    }
    selectValue(item) {
        return item.cat_opt_temp["value_" + this.props.lang];
    }

    getCategories(event) {
        this.props.getCategories({ parent: event.currentTarget.getAttribute('data-tag') }).then(succ => {
            console.log(succ.data)
            this.setState({
                categoriesList: succ.data
            })
        })
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (
            <div>
                <div class="text-center mx-auto g-max-width-600 g-mb-20 col">
                    <h2 class="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 ">{tran.translate('FILTER_ITEMS_HEADER')}</h2>
                </div>

                {this.state.categoriesList[0] ? (

                    <Collapsible open={true} trigger={this.state.categoriesList[0].category_parent[0].category == '_ROOT' ? tran.translate('CATEGORY_CHOOSE_CATEGORY_LABEL') : tran.translate('CATEGORY_FILTER_LABEL') + ": " + this.state.categoriesList[0].category_parent[0]["category_" + this.props.lang]} >
                        <div class="list-group list-group-border-0 g-mb-40">


                            {this.state.categoriesList[0].category_parent.map(item => {
                                console.log(item)
                                if (item.category == '_ROOT') { return <span></span> }
                                return <span data-tag={(item.category_parent != undefined ? item.category_parent.length : 0) > 0 ? item.category_parent[0].id : '_ROOT'} onClick={this.getCategories.bind(this)} className=" list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> <span class="  g-font-size-15 g-font-weight-600 g-pr-10 " aria-hidden="true">...</span>{item["category_" + this.props.lang]}</span>
                                </span>

                            })}
                            {this.state.categoriesList.filter(item => { return item.category_children.length > 0 }).map(item => {
                                return <span data-tag={item.id} onClick={this.getCategories.bind(this)} className=" list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"> <i class="fa fa-plus g-font-size-8 g-font-weight-100 g-pr-10 " aria-hidden="true"></i>{item["category_" + this.props.lang]}</span>
                                </span>

                            })}
                            {this.state.categoriesList.filter(item => { return item.category_children.length == 0 }).map(item => {
                                return <span data-tag={item.id} style={{ color: '#333' }} className=" list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover ">
                                    <span className="g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase g-pr-5">{item["category_" + this.props.lang]}</span>
                                </span>

                            })}</div>
                    </Collapsible>
                ) : < span ></span>}
            </div>

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
        getCategories: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, dto));

        },
        getItems: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Item.SEARCH_ITEM, dto));

        },
        createNewItem: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));

        },
        getUserImages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null))

        },


    }
}

export default withRouter(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterSearch)));
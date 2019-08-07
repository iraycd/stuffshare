/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Input, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import CommandList from '../../../../../../Shared/CommandList.js';




class CategoryOptionsListByType extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filter: "" };
        this.state.categoryOptionsType = []
        this.state.categoryOptions = []
        props.getCategoryOptionsType().then(succ => {

            this.setState({
                categoryOptionsType: succ.data
            });;
            return props.getCategoryOptions();

        }).then(succ => {
            console.log(succ.data)
            this.setState({
                categoryOptions: succ.data
            })
            console.log(succ.data);
        })

    }
    

    filterHandler(event) {
        this.setState({
            filter: event.target.value
        });


    }
    removeOption(event) {
        console.log(event.target.getAttribute('data-tag'));
        let id = event.target.getAttribute('data-tag')
        this.props.removeCategoryOptions({
            id: id
        }).then(succ => {
            this.setState({
                categoryOptions: this.state.categoryOptions.filter(item => {
                    return item.id != id
                })
            })
        }

        )
    }
    /* removeDictionary(event){
         this.props.removeDictionary(JSON.parse(event.target.getAttribute('data-tag')));
     }*/
    render() {

        const trans = Translator(this.props.codeList.data.LABEL, this.props.lang);
        return (

            < Col >
                <Label>{trans.translate('CODE_FILTER_LABEL')}</Label>
                <Input className="form-control rounded-0 g-mb-30" type="search" value={this.state.filter} onChange={this.filterHandler.bind(this)} />
                <div id="accordion-07" class="u-accordion u-accordion-color-primary" role="tablist" aria-multiselectable="true">

                    {this.state.categoryOptionsType.map((item) => {

                        let catFiltered = this.state.categoryOptions.filter((element) => { return element.cot_id == item.id });
                        let matched = catFiltered.filter((item) => {
                            return (String(item.name.toLowerCase()).startsWith(this.state.filter.toLowerCase())
                                || String(item.name.toLowerCase()).indexOf(this.state.filter.toLowerCase()) > 0)

                        });
                        let i = 0;
                        return (
                            <div class="card rounded-0 g-brd-none" key={item.id}>
                                <div id={"accordion-07-heading-" + item.id} class="u-accordion__header g-pa-0" role="tab">
                                    <h5 class="mb-0 text-uppercase g-font-size-default g-font-weight-400 g-pa-20a mb-0">
                                        <a class="d-block g-color-main g-text-underline--none--hover collapsed" href={"#accordion-07-body-" + item.id} data-toggle="collapse" data-parent="#accordion-07" aria-expanded="false" aria-controls={"accordion-07-body-" + item.id}>
                                            <span class="u-accordion__control-icon d-inline-block g-brd-right g-brd-gray-light-v4 g-color-primary text-center g-pa-20">
                                                <i class="fa fa-plus"></i>
                                                <i class="fa fa-minus"></i>
                                            </span>
                                            <span class="d-inline-block g-pa-15"> {this.state.filter.length > 0 && matched.length > 0 ? <span class="u-badge-v1 g-bg-green g-color-white g-rounded-50x g-mt-5 g-mr-5">{matched.length}</span> : <span></span>}
                                                {item.name + "  -  " + matched.length + " / " + catFiltered.length}
                                            </span>
                                        </a>
                                    </h5>
                                </div>
                                <div id={"accordion-07-body-" + item.id} class="collapse" role="tabpanel" aria-labelledby={"accordion-07-body-" + item.id} aria-expanded="false">
                                    <div class="u-accordion__body  ">
                                        <ListGroup>
                                            {
                                                catFiltered.map(element => {
                                                    if ((String(element.name.toLowerCase()).startsWith(this.state.filter.toLowerCase()) || String(element.name.toLowerCase()).indexOf(this.state.filter.toLowerCase()) > 0)) {
                                                        i++;
                                                        console.log(element.category_link)
                                                        return (
                                                            <ListGroupItem className="justify-content-between " className="" key={element.id} title={JSON.stringify(element, null, 4)} >

                                                                <Link to={"/categoryOptions/" + element.id} className="g-font-size-11 col-md-11 col-xs-11 g-color-primary--hover nav-link">{element.name}</Link>
                                                                {(element.category_link != undefined && element.category_link.length > 0) ? <span class="u-badge-v1 g-bg-primary g-color-white g-rounded-50x g-mt-5 g-mr-5">{element.category_link.length}</span> :
                                                                    (<i data-tag={element.id} className="remove-icon fa fa-times pointer" aria-hidden="true" onClick={this.removeOption.bind(this)}></i>)}
                                                            </ListGroupItem>);
                                                    }
                                                })}

                                        </ListGroup>
                                    </div>
                                </div>
                            </div>)
                    })
                    }
                </div>
            </Col >

        );
    }
}


const mapStateToProps = (state) => {

    return {


        codeList: state.DictionaryReducer,
        lang: state.LanguageReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryOptionsType: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, dto))
        },
        getCategoryOptions: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, dto))
        },
        removeCategoryOptions: (dto) => {
            return dispatch(new BaseService().queryThunt(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS, dto))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionsListByType);
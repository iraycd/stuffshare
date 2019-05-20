/*
    ./client/components/App.jsx
*/

import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, ListGroup, ListGroupItem ,Badge } from 'reactstrap';

import { connect } from 'react-redux';

import { DictionaryDTO, Enums, CommandList, QueryList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { Link } from 'react-router-dom';

class DictionaryList extends React.Component {

    constructor() {
        super();
        this.state = { filter: "" };
    }
    filterHandler(event) {
        this.setState({
            filter: event.target.value
        });


    }
    removeDictionary(event){
        this.props.removeDictionary(JSON.parse(event.target.getAttribute('data-tag')));
    }
    render() {

        const trans = Translator(this.props.codeList.data.LABEL, this.props.lang);
        return (

            < Col >
                <Label>{trans.translate('CODE_FILTER_LABEL')}</Label>
                <Input className="form-control rounded-0 g-mb-30" type="search" value={this.state.filter} onChange={this.filterHandler.bind(this)} />
                <div id="accordion-07" class="u-accordion u-accordion-color-primary" role="tablist" aria-multiselectable="true">

                    {Object.keys(Enums.CODE).map((key, el) => {
                        let matched = Object.values(this.props.codeList.data[Enums.CODE[key]]).filter((item) => {
                            return (String(item.code).startsWith(this.state.filter)
                                || String(item.code).indexOf(this.state.filter) > 0)

                        });
                        let i = 0;
                        return (
                            <div class="card rounded-0 g-brd-none" key={el}>
                                <div id={"accordion-07-heading-" + el} class="u-accordion__header g-pa-0" role="tab">
                                    <h5 class="mb-0 text-uppercase g-font-size-default g-font-weight-400 g-pa-20a mb-0">
                                        <a class="d-block g-color-main g-text-underline--none--hover collapsed" href={"#accordion-07-body-" + el} data-toggle="collapse" data-parent="#accordion-07" aria-expanded="false" aria-controls={"accordion-07-body-" + el}>
                                            <span class="u-accordion__control-icon d-inline-block g-brd-right g-brd-gray-light-v4 g-color-primary text-center g-pa-20">
                                                <i class="fa fa-plus"></i>
                                                <i class="fa fa-minus"></i>
                                            </span>
                                            <span class="d-inline-block g-pa-15">
                                                {Enums.CODE[key] + "  -  " + matched.length + " / " + Object.values(this.props.codeList.data[Enums.CODE[key]]).length}
                                            </span>
                                        </a>
                                    </h5>
                                </div>
                                <div id={"accordion-07-body-" + el} class="collapse" role="tabpanel" aria-labelledby={"accordion-07-body-" + el} aria-expanded="false">
                                    <div class="u-accordion__body  ">
                                        <ListGroup>
                                            {
                                                Object.values(this.props.codeList.data[Enums.CODE[key]]).sort((a,b)=>{
                                                    return String(a.code)>String(b.code)?1:-1
                                                }).map((item, indx) => {
                                                    if (  (String(item.code).startsWith(this.state.filter) || String(item.code).indexOf(this.state.filter) > 0)) {
                                                        i++;
                                                        return (
                                                            <ListGroupItem className="justify-content-between " className="" key={indx} title={JSON.stringify(item, null, 4)} >

                                                                <Link to={"/dictionary?code=" + item.code + "&type=" + Enums.CODE[key]} className="g-font-size-11 col-md-11 col-xs-11 g-color-primary--hover nav-link">{item.code}</Link>
                                                                <i data-tag={JSON.stringify(item)} className="remove-icon fa fa-times pointer" aria-hidden="true" onClick={this.removeDictionary.bind(this)}></i>
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
          removeDictionary: (dto) => {
            dispatch(new BaseService().commandThunt(CommandList.Dictionary.REMOVE_DICTIONARY, dto))
          }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DictionaryList);
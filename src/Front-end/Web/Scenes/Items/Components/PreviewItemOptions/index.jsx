/*
    ./client/components/App.jsx
*/

import React from 'react';
import { Translator } from '../../../../../../Shared/index.js';
import { Col, Container, Row, Label } from 'reactstrap';




class PreviewItemOptions extends React.Component {

    constructor(props) {
        super(props);


    }

    componentDidMount() {



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


    render() {

        let groupByCat = {};
        this.props.item.itemCategoryOption.forEach(element => {
            if (this.props.on_map == true) {
                if ((element.category_link.is_on_map == null ? element.category_link.catOption.is_on_map : element.category_link.is_on_map) == true) {
                    groupByCat[element.category_link.co_id] = element.category_link
                }
            } else {
                groupByCat[element.category_link.co_id] = element.category_link
            }
        });
        console.log(groupByCat);
        return (
            Object.keys(groupByCat).sort((a, b) => {
                return Number(groupByCat[a] == null ? groupByCat[a].catOption.order : groupByCat[a].order) > Number(groupByCat[b] == null ? groupByCat[b].catOption.order : groupByCat[b].order) ? 1 : -1
            }).map(item => {
                return <Col className="g-mb-5" xs={this.props.col_size}><span className="g-color-gray-dark-v2  g-color-gray-dark-v4 g-letter-spacing-1  g-line-height-1_5 g-font-weight-600 g-font-size-9">{groupByCat[item].catOption["name_" + this.props.lang]}</span>
                    <br />
                    {
                        this.props.item.itemCategoryOption.filter(option => { return option.category_link.co_id == item }).map(result => {
                            return <div>{this.showValue(result)}</div>
                        })
                    }

                </Col>
            })
        )
        /*   return (
               <Col className="g-my-20 text-center">
   
                   {this.props.catOptions.catOptions.sort((a, b) => {
                       return Number(a.order) >= Number(b.order) ? 1 : -1
                   }).map(item => {
                       return (<CategoryOptionTempMapper item={item} category_id={this.props.category_id}  ></CategoryOptionTempMapper>
                       )
                   })}
               </Col>)*/

    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        categoryTree: state.CategoryTreeReaducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default PreviewItemOptions;
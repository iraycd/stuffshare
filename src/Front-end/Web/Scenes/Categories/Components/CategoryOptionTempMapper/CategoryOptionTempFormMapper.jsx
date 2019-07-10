/*
    ./client/components/App.jsx
*/

import React from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import CategoryOptionsDTO from '../../../../../../Shared/DTO/CategoryOptions/CategoryOptionsDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import CategoryOptionFormSELECT from '../CategoryOptionTypes/FORM/CategoryOptionFormSELECT.jsx';
import { DictionaryDTO, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { DropDownList } from './../../../../Components/index.js';
import CategoryOptionFormMULTISELECT from '../CategoryOptionTypes/FORM/CategoryOptionFormMULTISELECT.jsx';



class CategoryOptionTempFormMapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.getCategoryOptionsTypeQuery = [];


    }

    componentDidMount() {
        this.props.getCategoryOptionsType().then(succ => {
            this.setState(
                {
                    getCategoryOptionsTypeQuery: succ.data
                }
            )

        });
    }
    getDropDownValues() {
        return this.state.getCategoryOptionsTypeQuery.map(item => {
            return { id: item.id, value: item.name, type: item.type }
        });
    }





    checkType(catType) {
        return this.state.getCategoryOptionsTypeQuery.filter(item => {
             return (item.type == catType && (item.id == this.props.catOption.cot_id))

        })
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (

            <div>
                {this.checkType('SELECT').length > 0 ? <div><CategoryOptionFormSELECT onChange={this.props.onChange} catOptionsTemp={this.checkType('SELECT')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormSELECT></div> :
                       this.checkType('MULTI_SELECT').length > 0 ? <div><CategoryOptionFormMULTISELECT  onChange={this.props.onChange} catOptionsTemp={this.checkType('MULTI_SELECT')[0]} category_id={this.props.category_id} catOption={this.props.catOption}></CategoryOptionFormMULTISELECT></div> :
               
                       //        this.checkType('SINGLE').length > 0 ? <span><CategoryOptionSINGLE catOptionsTemp={this.checkType('SINGLE')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionSINGLE></span> :
                    //           this.checkType('BETWEEN').length > 0 ? <span><CategoryOptionBETWEEN catOptionsTemp={this.checkType('BETWEEN')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionBETWEEN></span> :

                    <span></span>
                }

            </div>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        // catOptions: state.EditCategoryReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryOptionsType: (id) => {
            return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
        }



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionTempFormMapper);


import React from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { Input, Label, Col, Container, Form, FormGroup, ListGroup, Row } from 'reactstrap';
import translate from 'translate';
import uuidv4 from "uuid/v4";
import CommandList from '../../../../../../../Shared/CommandList';
import CategoryOptionsDTO from '../../../../../../../Shared/DTO/CategoryOptions/CategoryOptionsDTO';
import QueryList from '../../../../../../../Shared/QueryList';
import { BaseService } from '../../../../../../App/Architecture/baseServices.js';
import ButtonLoader from '../../../../../Components/FormComponent/Components/ButtonLoader/index.jsx';
import TextBox from '../../../../../Components/FormComponent/Components/TextBox/index.jsx';
import { Translator } from './../../../../../../../Shared/index.js';
import CATEGORY_EDIT_ACTIONS from './../../../Scenes/EditCategory/actions.js'
import DropDownList from '../../../../../Components/FormComponent/Components/DropDownList/index.jsx';
import DayPickerInputComponent from './../../../../../Components/FormComponent/Components/DayPickerInputComponent/index.jsx'

class CategoryOptionFormSINGLE extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.dataValue = null;
        this.state.id = this.props.values ? this.props.values : {};

    }


    onChange(event) {

        this.setState({
            id: event.target.value
        });
        console.log(this.props.catOption)
        this.props.onChange(this.props.catOption,
            [{
                id: uuidv4(),
                cat_opt_id: this.props.catOption.cat_opt_temp[0].id,
                val: event.target.value,
                element: this.props.catOption.id,
                type: 'SINGLE'
                ,col_id:this.props.catOption.category_link[0].id
                ,catOption: this.props.catOption.cat_opt_temp[0]
            }])


    }
    dateHandler(event) {
        this.setState({
            dataValue: event
        });

        this.props.onChange(this.props.catOption, [{ id: uuidv4(), cat_opt_id: this.props.catOption.cat_opt_temp[0].id, val: event, element: this.props.catOption.id, type: 'SINGLE' }])



    }
    getDropDownValues() {
        return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
            return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
        })];
    }




    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        console.log(this.props.catOption.cat_opt_temp);
        console.log(this.props.catOption.category_link);
        const link = this.props.catOption.category_link[0];
        console.log('kupaaa');
        return (
            <div class="g-mb-10">
                {['FLOAT', 'STRING', 'NUMBER'].includes(this.props.catOption.cat_opt.name) ?
                    <TextBox placeholder={this.props.catOption.cat_opt_temp[0]["placeholder_" + this.props.lang]} onChange={this.onChange.bind(this)} isRequired={link.is_require ? link.is_require : this.props.catOption.is_require} label={this.props.catOption["name_" + this.props.lang]} value={this.state.email} field="email" validation={[]} />
                    : <span></span>}
                {['DATE'].includes(this.props.catOption.cat_opt.name) ?
                    <DayPickerInputComponent
                        dateFormat="dd-MM-yyyy"
                        showTimeSelect={false}
                        minDate={null}
                        value={this.state.dataValue} placeholder={this.props.catOption.cat_opt_temp[0]["placeholder_" + this.props.lang]} onChange={this.dateHandler.bind(this)} isRequired={true} label={this.props.catOption["name_" + this.props.lang]} field="birthDate" validation={[]} />
                    : <span></span>}

            </div >

        )
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        //  catOptions: state.EditCategoryReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {







    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionFormSINGLE);


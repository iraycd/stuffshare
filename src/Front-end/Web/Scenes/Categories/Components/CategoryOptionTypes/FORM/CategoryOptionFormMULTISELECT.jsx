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
import Checkbox from '../../../../../Components/FormComponent/Components/Checkbox/index.jsx';



class CategoryOptionFormMULTISELECT extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.checked = []
        this.state.validation = [];
        this.state.id = this.props.values ? this.props.values : {};

    }


    onChange(event) {
        // let checked = event.target.checked;
        let checked = this.state.checked;
        checked = checked.filter(item => {
            return item.id != event.target.getAttribute('data-key')
        })
        checked.push({  id: event.target.getAttribute('data-key'),val: event.target.checked,element:this.props.catOption.id})
        console.log(event.target.getAttribute('data-key'))

        this.setState({
            checked: checked
        });
        this.props.onChange(this.props.event, checked.filter(item => { return item.val == true }))

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
        const link = this.props.catOption.category_link[0];

        return (
            <div class="g-mb-10">
                <div>{this.props.catOption["name_" + this.props.lang]}</div>
                <Row class="g-pa-10">
                    {this.props.catOption.cat_opt_temp.map(item => {
                        return (
                            <Col xs="4">
                                <Checkbox data-key={item.id} validation={[]} value={this.state.checked.filter(el => { return el.id == item.id }).length > 0 ? this.state.checked.filter(el => { return el.id == item.id })[0].value : false} onChange={this.onChange.bind(this)} labelInline={item["value_" + this.props.lang]}></Checkbox>
                            </Col>
                        )
                    })}
                </Row>
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
)(CategoryOptionFormMULTISELECT);


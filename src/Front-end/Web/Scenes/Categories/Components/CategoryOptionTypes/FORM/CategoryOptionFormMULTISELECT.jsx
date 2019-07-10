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



class CategoryOptionFormMULTISELECT extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.id = this.props.values ? this.props.values : {};

    }


    onChange(event) {

        this.setState({
            id: event.target.value
        });
        this.props.onChange(event)

    }
    getDropDownValues() {
        return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
            return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
        })];
    }




    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (
            <div>
                <FormGroup check inline>
                    <Label check>
                        <Input type="checkbox" /> Some input
          </Label>
                </FormGroup>
                <FormGroup check inline>
                    <Label check>
                        <Input type="checkbox" /> Some other input
          </Label>
                </FormGroup>
            </div>

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


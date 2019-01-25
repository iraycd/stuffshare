/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { DictionaryDTO, Enums, CommandList, QueryList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList,ButtonLoader } from './../../../../Components/index.js';

class DictionaryEdit extends React.Component {

    constructor() {
        super();
        this.state = new DictionaryDTO();

        this.state.validation = [];



    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
      //          this.validation();
            });
        }
    }
    getDropDownValues() {
        return [
            { id: Enums.CODE.ERROR, value: Enums.CODE.ERROR }
            , { id: Enums.CODE.INFO, value: Enums.CODE.INFO }
            , { id: Enums.CODE.VALIDATION, value: Enums.CODE.VALIDATION }
            , { id: Enums.CODE.WARNING, value: Enums.CODE.WARNING }
            , { id: Enums.CODE.SUCCESS, value: Enums.CODE.SUCCESS } 
            , { id: Enums.CODE.ERROR_GLOBAL, value: Enums.CODE.ERROR_GLOBAL }
            , { id: Enums.CODE.INFO_GLOBAL, value: Enums.CODE.INFO_GLOBAL }
            , { id: Enums.CODE.SUCCESS_GLOBAL, value: Enums.CODE.SUCCESS_GLOBAL }
            , { id: Enums.CODE.WARNING_GLOBAL, value: Enums.CODE.WARNING_GLOBAL }
            , { id: Enums.CODE.LABEL, value: Enums.CODE.LABEL }
            , { id: Enums.CODE.PLACEHOLDER, value: Enums.CODE.PLACEHOLDER }


        ]
    }
    validation() {
        let validation = DictionaryDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);

        });
        this.setState({
            validation: validation
        });
        return validation;
    }
    codeHandler(event) {
        this.setState({
            code: event.target.value
        });

        this.refreshValidation();


    }
    statusHandler(event) {
        this.setState({
            status: event.target.value
        });
        this.refreshValidation();
    }

    plHandler(event) {
        const pl = this.state.message;
        pl.pl = event.target.value;
        this.setState({
            message: pl
        });

        this.refreshValidation();
    }
    usHandler(event) {
        const us = this.state.message;
        us.us = event.target.value;
        this.setState({
            message: us
        });

        this.refreshValidation();
    }

    typeHandler(event) {
        this.setState({
            type: event.target.value
        });

        this.refreshValidation();
    }
    submitHanlder(event) {
        this.state.toRefresh = true;


        event.preventDefault();
     //   if (this.validation().length == 0) {
            // this.props.code=this.state;
            
            this.props.addDictionary(this.state);

     //   }
    }


    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        this.refreshValidation();
        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-60 g-mb-30 text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                    <h2 className="g-color-black mb-4">{tran.translate('CODE_FORM_HEADER')}</h2>
                    <p className="lead "></p>
                </Col>

                <TextBox placeholder={phTrans.translate('CODE_CODE_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_CODE_LABEL')} value={this.state.code} onChange={this.codeHandler.bind(this)} field="code" validation={this.state.validation} />

                <DropDownList isRequired={true} label={tran.translate('CODE_TYPE_LABEL')} valueOptions={this.getDropDownValues()} value={this.state.type} onChange={this.typeHandler.bind(this)} field="type" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('CODE_STATUS_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_STATUS_LABEL')} value={this.state.status} onChange={this.statusHandler.bind(this)} field="status" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('CODE_PL_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_PL_LABEL')} value={this.state.message.pl} onChange={this.plHandler.bind(this)} field="message.pl" validation={this.state.validation} />


                <TextBox placeholder={phTrans.translate('CODE_US_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_US_LABEL')} value={this.state.message.us} onChange={this.usHandler.bind(this)} field="message.us" validation={this.state.validation} />

                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"}  className={"btn u-btn-primary rounded-0"} value={"Submit"} isLoading={this.props.codeDict.edit.isLoading}/>
            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang :state.LanguageReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDictionary: (dto) => {
            dispatch(new BaseService().commandThunt(CommandList.Dictionary.ADD_DICTIONARY, dto));
        }, getDictionary: () => {
            dispatch({
                type: QueryList.Dictionary.GET_DICTIONARY,
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DictionaryEdit);
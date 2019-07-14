import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import FormComponent from './../../index.jsx';
export default class DayPickerInputComponent extends FormComponent {

    constructor() {
        super();

    }

    render() {

        this.init();
        let formValidation = this.FormValidation();


        let result = (
            <FormGroup color={formValidation.isDanger} className={formValidation.classError}>
                <Label for={this.state.guid} class="col-3 ">{this.state.label}</Label>
                <Col >
                    <DayPickerInput
                    value={this.props.value} id={this.state.guid} onDayChange={this.props.onChange} placeholder={this.props.placeholder} />
                    {formValidation.FormValidation}
                </Col>
            </FormGroup>
        );
        return result;
    }


}
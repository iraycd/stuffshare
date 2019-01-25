import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';

import FormComponent from './../../index.jsx';
export default class TextBox extends FormComponent {

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
                    <Input className="form-control rounded-0" type={this.props.type?this.props.type:"search"} value={this.props.value} id={this.state.guid} onChange={this.props.onChange} placeholder={this.props.placeholder} />
                    {formValidation.FormValidation}
                </Col>
            </FormGroup>
        );
        return result;
    }


}
TextBox.propTypes = {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
}
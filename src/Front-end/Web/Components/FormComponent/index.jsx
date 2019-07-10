import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';
import './../../../../Shared/BaseObjects/Helper/commonFunctions.js';

export default class FormComponent extends React.Component {

    constructor() {
        super();
    }
    init() {
        let label = this.props.label;
        if (this.props.isRequired == true) {
            label +=' *';
        }
        this.state = {
            field: this.props.field,
            validation: this.props.validation,
            guid: global.guid(),
            label: label
        };
    }
    FormValidation() {
        let FormValidation = [];
        let i = 0;
        let isDanger = "";
        let classError = "row g-mb-25 text-left";
        this.state.validation.map((item) => {
            if (item.path[0] == this.props.field) {
                FormValidation[i] = <small className="form-control-feedback" key={i}>{item.msg}<br /></small>
                i++;
                if (i === 1) {
                    isDanger = "danger";
                    classError += " u-has-error-v1";
                }
            }
        })
        return { FormValidation: FormValidation, isDanger: isDanger, classError: classError };
    }



}
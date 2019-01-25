"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class UserRegisterInternalDTO extends BaseDTO {
    constructor() {
        super();
        this.name = '';
        this.surname = '';
        this.email = '';
        this.phone='';
        this.birthDate='';
        this.password='';
        this.passwordRepeat=''
        this.city='';
        this.city_id='';
        this.adress='';
        this.country='';
        this.country_id='';
        this.longitude='';
        this.latitude='';
        this.uuid='';
    };
    validation(state) {
        // @ts-ignore
        const validator = new Validator();
        validator(state.name).display("name").required().isString().notEmpty();

        validator(state.surname).display("surname").required().isString().notEmpty();

        validator(state.email).display("email").required();
        return validator.run();
    };
}


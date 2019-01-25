"use strict";

export default class BaseDTO {
    constructor() {
        this.id = 0;
        this.uid=''
    };
    validation(state) {
        return [];
    }
    log() {
        return this;
    }
};

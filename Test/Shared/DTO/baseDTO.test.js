"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai

const BaseDTO = require('./../../../src/Shared/DTO/baseDTO');

describe('BaseDTO', () => {

    beforeEach(() => {

        // emptyInfra = new ValidationException({ dictionaryDI: dictionary });
    });
    after(function() {});

    it('DTO should be a class', () => {
        expect(new BaseDTO()).is.not.equal(null);
    });
    it('DTO should have function validation', () => {
        expect(new BaseDTO().validation).is.not.undefined;
    });
    it('DTO should have function log fields', () => {
        expect(new BaseDTO().log).is.not.undefined;
    });
});
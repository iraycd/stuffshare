"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai

const DictionaryDTO = require('./../../../../src/Shared/DTO/Dictionary/DictionaryDTO');
const BaseDTO = require('./../../../../src/Shared/DTO/baseDTO');

describe('DictionaryDTO', () => {

    beforeEach(() => {

        // emptyInfra = new ValidationException({ dictionaryDI: dictionary });
    });
    after(function() {});

    it('DTO should be a class', () => {
        expect(new DictionaryDTO()).is.not.equal(null);
    });
    it('Should implement class BaseDTO', () => {
        expect(new DictionaryDTO()).is.instanceof(BaseDTO);
    });
    it('Should have code field class BaseDTO', () => {
        expect(new DictionaryDTO().code).is.not.undefined;
    });
    it('Should have status field class BaseDTO', () => {
        expect(new DictionaryDTO().status).is.not.undefined;
    });
    it('Should have type field class BaseDTO', () => {
        expect(new DictionaryDTO().type).is.not.undefined;
    });
    it('Should have message field class BaseDTO', () => {
        expect(JSON.stringify(new DictionaryDTO().message)).is.equal(JSON.stringify({ "pl": "", "us": "" }));
    });
});
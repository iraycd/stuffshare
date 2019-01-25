"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const ValidationException = require('./../../../../src/Back-end/Architecture/Exceptions/validationExceptions');
const CodeDictionary = require('./../../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const JsonDB = require('node-json-db');

describe('ValidationException', () => {
    let emptyInfra;
    let dictionary;
    let jsonDBStub;
    beforeEach(() => {
        jsonDBStub = sinon.createStubInstance(JsonDB);
        dictionary = CodeDictionary({ jsonDbDI: jsonDBStub });
        emptyInfra = new ValidationException({ dictionaryDI: dictionary });
    });
    after(function() {});
    it('constructor() should create empty Exception ', () => {
        expect(emptyInfra).is.not.equal(null);
    });

    it('throw shoulr return filled exception object ', () => {
        let model = emptyInfra.throw({ code: "CODE", field: "field" });
        expect(model.Field).is.equal("field");
        expect(model.Code).is.equal("CODE");
    });

    it('throw should run dictionary.get function and fill fields', () => {
        const getStub = sinon.spy(dictionary, 'get');
        jsonDBStub.getData.callsFake(() => {
            return Object.assign({}, {
                "status": "WARNING",
                "type": "VALIDATION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {0} , i testuje {1}",
                    "us": "This is {0}, and he test {1}"
                }
            });
        });
        let model = emptyInfra.throw({ code: "CODE", field: "field" });
        sinon.assert.calledOnce(getStub);
        getStub.restore();
    });
    it('Check if params are correctly field from dictionary', () => {

        jsonDBStub.getData.callsFake(() => {
            return Object.assign({}, {
                "status": "WARNING",
                "type": "VALIDATION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {0} , i testuje {1}",
                    "us": "This is {0}, and he test {1}"
                }
            });
        });
        let model = emptyInfra.throw({ code: "CODE", field: "field" }, "test", "test2");
        expect(model.Field).is.equal("field");
        expect(model.Code).is.equal("CODE");
        expect(model.Status).is.equal("WARNING");
        expect(JSON.stringify(model.Msg)).is.equal(JSON.stringify({
            "pl": "To jest test , i testuje test2",
            "us": "This is test, and he test test2"
        }));
    });
});
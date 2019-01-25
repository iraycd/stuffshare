"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const JsonDB = require('node-json-db');
const CodeDictionary = require('./../../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const ValidationException = require('./../../../../src/Back-end/Architecture/Exceptions/validationExceptions');
describe('CodeDictionary', () => {
    let codeDicionary = null;
    let dbJson = null;
    beforeEach(() => {
        dbJson = sinon.createStubInstance(JsonDB); //new JsonDB("myDataBase", true, false);
        codeDicionary = CodeDictionary({
            jsonDbDI: dbJson,
            languge: 'PL'
        });
    });

    it(`We should run dictionary as a function with closure `, () => {
        expect(codeDicionary).is.not.equal(null);
    });
    it(`We should be able to get json object from codeDictionary`, () => {
        const func = sinon.stub(codeDicionary, 'get');
        func.restore();
    });
    it(`We should be able to get json object from codeDictionary, this function replace element if exist`, () => {
        const set = sinon.stub(codeDicionary, 'set');
        set.restore();
    });
    it(`We should be able to delete unused value`, () => {
        const func = sinon.stub(codeDicionary, 'remove');
        func.restore();
    });
    it(`JSON DB should be create as dependency injection`, () => {
        const func = sinon.createStubInstance(JsonDB);
        expect(CodeDictionary({ jsonDbDI: func }).checkDb()).is.equal(true);
    });
    it(`add to Db new JSON `, () => {
        codeDicionary.set("INVALID_ELEMENT", { element: "ELEMENT2" });
        sinon.assert.calledOnce(dbJson.push);
    });
    it(`get from Db new JSON `, () => {
        dbJson.getData.callsFake(() => {
            return Object.assign({}, {
                "status": "WARNING",
                "type": "EXCEPTION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {1} , i testuje {2}",
                    "us": "This is {1}, and he test {2}"
                }
            });
        });
        codeDicionary.get("INVALID_ELEMENT");
        sinon.assert.calledOnce(dbJson.getData);
        dbJson.getData.restore();
    });
    it(`remove from Db new JSON `, () => {
        codeDicionary.remove("INVALID_ELEMENT");
        sinon.assert.calledOnce(dbJson.delete);
    });
    it(`scanf string with templates`, () => {
        dbJson.getData.callsFake(() => {
            return {
                "status": "WARNING",
                "type": "EXCEPTION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {0} , i testuje {1}",
                }
            };
        });
        const formatStub = sinon.stub(String.prototype, 'format');
        codeDicionary.get("INVALID_ELEMENT", "Michal", "this function");
        sinon.assert.calledOnce(formatStub);
        dbJson.getData.restore();
        formatStub.restore();
    });
    it(`format(scanf from C) string run for each translations`, () => {
        dbJson.getData.callsFake(() => {
            return {
                "status": "WARNING",
                "type": "EXCEPTION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {0} , i testuje {1}",
                    "us": "This is {0}, and he test {1}"
                }
            };
        });
        const formatStub = sinon.stub(String.prototype, 'format');
        codeDicionary.get("INVALID_ELEMENT", "Michal", "this function");
        sinon.assert.calledTwice(formatStub);
        dbJson.getData.restore();
        formatStub.restore();
    });

    it(`test checking if function return the same object modified by String format`, () => {
        dbJson.getData.callsFake(() => {
            return {
                "status": "WARNING",
                "type": "EXCEPTION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {0} , i testuje {1}",
                    "us": "This is {0}, and he test {1}"
                }
            };
        });
        const result = codeDicionary.get("INVALID_ELEMENT", "Michal", "this function");

        expect(JSON.stringify(result)).is.equal(JSON.stringify({
            "status": "WARNING",
            "type": "EXCEPTION",
            "code": "CODE",
            "message": {
                "pl": "To jest {0} , i testuje {1}".format("Michal", "this function"),
                "us": "This is {0}, and he test {1}".format("Michal", "this function")
            }
        }));


    });

});
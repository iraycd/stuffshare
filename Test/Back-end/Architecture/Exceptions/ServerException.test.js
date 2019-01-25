"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const BaseException = require('./../../../../src/Shared/Exceptions/baseException');
const ServerException = require('./../../../../src/Back-end/Architecture/Exceptions/serverException')
const ValidationException = require('./../../../../src/Back-end/Architecture//Exceptions/validationExceptions');
const CodeDictionary = require('./../../../../src/Back-end//Architecture/Dictionary/codeDictionary');

const JsonDB = require('node-json-db');
describe('ServerException', () => {
    let emptyInfra;
    let jsonDBStub;
    let dictionaryStub;
    beforeEach(() => {
        jsonDBStub = sinon.createStubInstance(JsonDB);
        dictionaryStub = CodeDictionary({ jsonDbDI: jsonDBStub });
        emptyInfra = new ServerException({ dictionaryDI: dictionaryStub });

    });
    after(function() {});
    it('constructor() should create empty Exception ', () => {
        let model = new ServerException({});;
        expect(model).is.not.equal(null);
    });
    it('BaseException should extends TypeError', () => {
        expect(emptyInfra).is.instanceof(BaseException);
    });

    it('BaseException get as param param code, message', () => {
        const element = new ServerException({}).throw({ status: "ERROR", msg: "ERROR message", code: "CODE" });
        expect(element.Status).is.equal("ERROR");
        expect(element.Code).is.equal("CODE");
        expect(element.Msg).is.equal("ERROR message");
        expect(element.Validations).is.length(0);
    });
    it('BaseException get as param param code, message, and way to set Array with ValidationException type', () => {

        const element = new ServerException({}).throw({ status: "ERROR", msg: "ERROR message", code: "CODE", validations: [new ValidationException({ dictionaryDI: dictionaryStub }), new ValidationException({ dictionaryDI: dictionaryStub })] });
        expect(element.Status).is.equal("ERROR");
        expect(element.Code).is.equal("CODE");
        expect(element.Msg).is.equal("ERROR message");
        expect(element.Validations).is.length(2);
    });
    it('Add additional element to Exception Array by addValidationError', () => {

        const element = new ServerException({}).throw({ status: "ERROR", msg: "ERROR message", code: "CODE" });
        element.addValidationError(new ValidationException({ dictionaryDI: dictionaryStub }));
        expect(element.Validations).is.length(1);
    });
    it('Validator error should be type of ValidationException otherwise throw Exception', () => {

        const element = new ServerException({}).throw({ status: "ERROR", msg: "ERROR message", code: "CODE" });
        let i = 0;
        try {
            element.addValidationError({});
        } catch (err) {
            expect(err).is.equal('WRONG_TYPE');
            i = 1;
        }
        expect(i).is.equal(1);
    });
    it('If there is only code then should use dictionary', () => {
        const getStub = sinon.spy(dictionaryStub, 'get');
        const element = new ServerException({ dictionaryDI: dictionaryStub }).throw({ code: "CODE" });
        sinon.assert.calledOnce(dictionaryStub.get);
        sinon.assert.calledOnce(getStub);
        getStub.restore();
    });

    it('fill exception from code dictionary', () => {
        const getStub = sinon.spy(dictionaryStub, 'get');
        jsonDBStub.getData.callsFake(() => {
            return Object.assign({}, {
                "status": "400",
                "type": "EXCEPTION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {1} , i testuje {2}",
                    "us": "This is {1}, and he test {2}"
                }
            });
        });
        const element = new ServerException({ dictionaryDI: dictionaryStub }).throw({ code: "CODE" });
        expect(element.Status).is.equal("400");
        expect(element.Code).is.equal("CODE");
        expect(JSON.stringify(element.Msg)).is.equal(JSON.stringify({
            "pl": "To jest {1} , i testuje {2}",
            "us": "This is {1}, and he test {2}"
        }));
        getStub.restore();
    });

    it('fill exception from code and way to send param to messages', () => {
        const getStub = sinon.spy(dictionaryStub, 'get');
        jsonDBStub.getData.callsFake(() => {
            return Object.assign({}, {
                "status": "400",
                "type": "EXCEPTION",
                "code": "CODE",
                "message": {
                    "pl": "To jest {0} , i testuje {1}",
                    "us": "This is {0}, and he test {1}"
                }
            });
        });
        const element = new ServerException({ dictionaryDI: dictionaryStub }).throw({ code: "CODE" }, "Michal", "To");
        expect(JSON.stringify(element.Msg)).is.equal(JSON.stringify({
            "pl": "To jest Michal , i testuje To",
            "us": "This is Michal, and he test To"
        }));
        getStub.restore();
    });


});
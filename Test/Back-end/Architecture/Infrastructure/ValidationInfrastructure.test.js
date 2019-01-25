"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const ValidInfrastructure = require('./../../../../src/Back-end/Architecture/Infrastructure/validatonInfrastructure');
const BaseInfrastracture = require('./../../../../src/Back-end/Architecture/BaseInfrastructure');
const logger = require('./../../../../src/Back-end/Architecture/logConfig');
const ValidExceptions = require('./../../../../src/Back-end/Architecture/Exceptions/validationExceptions');

const ServerExceptions = require('./../../../../src/Back-end/Architecture/Exceptions/serverException');
const BaseExceptions = require('./../../../../src/Shared/Exceptions/baseException');
const CodeDictionary = require('./../../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const JsonDB = require('node-json-db');

const BaseAction = require('./../../../../src/Back-end/Architecture/baseAction');
describe('ValidatonInfrastructure', () => {
    let emptyInfra = null;
    let jsonDBStub;
    let dictionaryStub;;
    let baseException;
    let baseAction = null;
    beforeEach(() => {
        baseAction = sinon.createStubInstance(BaseAction);
        baseAction.commandLogic.callsFake((dto) => { return dto.model; });
        jsonDBStub = sinon.createStubInstance(JsonDB);
        dictionaryStub = CodeDictionary({ jsonDbDI: jsonDBStub });
        baseException = new ServerExceptions({ dictionaryDI: dictionaryStub });
        emptyInfra = new ValidInfrastructure({ serverExceptionDI: baseException });
    });

    it('ValidInfrastructure extends BaseInfrastracture', () => {
        expect(emptyInfra).is.instanceof(BaseInfrastracture);
    });

    it('Create empty object', () => {
        expect(emptyInfra.getNext()).is.equal(null);
    });

    it('executeLayer with one element should run Valid()', () => {

        const validStub = sinon.stub(ValidInfrastructure.prototype, 'valid');
        emptyInfra.addToValid(() => {});
        emptyInfra.executeLayer({});
        sinon.assert.calledOnce(validStub);
        validStub.restore();
    });

    it('executeLayer should return dtoObject', () => {

        const element = { "1": 1 };
        emptyInfra.executeLayer(element);
        expect(emptyInfra.executeLayer(element)).is.equal(element);


    });

    it('runChain should return dtoObject from CQ logic function', () => {
        // emptyInfra.executeLayer(element);
        expect(emptyInfra.runChain(baseAction)).is.equal(baseAction.model);
    });

    it('addToValid  should return number of validation function ', () => {
        const element = function() {};
        expect(emptyInfra.addToValid(element)).is.equal(1);
    });

    it('addToValid should return number of validation function (2 functions) ', () => {
        const element = () => {};
        emptyInfra.addToValid(() => {});
        expect(emptyInfra.addToValid(element)).is.equal(2);
    });

    it('Should run validate function one time  ', () => {

        Object.prototype.test = () => {};
        const validStub = sinon.stub(Object.prototype, 'test');

        emptyInfra.addToValid(Object.prototype.test);
        emptyInfra.runChain(baseAction);
        sinon.assert.calledOnce(validStub);

        delete Object.prototype.test;
        validStub.restore();
    });

    it('Should run validate function twice time in a loop ', () => {

        Object.prototype.test = () => {};
        const validStub = sinon.stub(Object.prototype, 'test');
        emptyInfra.addToValid(Object.prototype.test);
        emptyInfra.addToValid(Object.prototype.test);
        emptyInfra.runChain(baseAction);
        sinon.assert.calledTwice(validStub);
        delete Object.prototype.test;
        validStub.restore();
    });

    it('Should run throw validateException from validate function ', () => {

        const error = new ValidExceptions({ dictionaryDI: dictionaryStub });
        Object.prototype.test = () => {};
        const validStub = sinon.stub(Object.prototype, 'test').callsFake(() => { throw error; });

        emptyInfra.addToValid(Object.prototype.test);
        try {
            emptyInfra.runChain({});
        } catch (err) {
            expect(err.Validations[0]).instanceof(ValidExceptions);
        }

        sinon.assert.calledOnce(validStub);

        delete Object.prototype.test;
        validStub.restore();
    });
    it('Should add invalid filed to array with validation warnings ( only create function and run ) ', () => {

        const error = new ValidExceptions({ dictionaryDI: dictionaryStub });
        const saveInvalid = sinon.stub(ValidInfrastructure.prototype, 'addInvalid');
        emptyInfra.addToValid(() => { throw error; });
        emptyInfra.runChain(baseAction);
        sinon.assert.calledOnce(saveInvalid);
        saveInvalid.restore();
    });

    it('If invalidMessages is not empty then throw exception', () => {

        const error = new ValidExceptions({ dictionaryDI: dictionaryStub });
        emptyInfra.addToValid(() => { throw error; });
        let result = 0;
        try {
            emptyInfra.runChain({});
        } catch (err) {
            result = 1;
        }
        expect(result).is.equal(1);
    });

    it('Throw exception of type BaseExceptions with one ValidExceptions element', () => {

        const error = new ValidExceptions({ dictionaryDI: dictionaryStub });
        emptyInfra.addToValid(() => { throw error; });
        let result = 0;
        try {
            emptyInfra.runChain(baseAction);
        } catch (err) {
            if (err instanceof ServerExceptions) {
                if (err.Validations[0] == error) {
                    result = 1;
                }
            } else {
                throw err;
            }
        }
        expect(result).is.equal(1);
    });
    it('If invalidMessages is not empty then throw exceptison with some errors', () => {

        emptyInfra.addToValid(() => { throw new ValidExceptions({ dictionaryDI: dictionaryStub }); });
        emptyInfra.addToValid(() => { throw new ValidExceptions({ dictionaryDI: dictionaryStub }); });
        let result = 0;
        try {
            emptyInfra.runChain(baseAction);
        } catch (err) {
            expect(err.Validations.length).is.equal(2);
            result = 1;

        }
        expect(result).is.equal(1);
    });

});
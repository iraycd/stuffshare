"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const BaseAction = require('./../../../src/Back-end/Architecture/baseAction');
const logFileInf = require('./../../../src/Back-end/Architecture/Infrastructure/logFileInfrastructure');
const ServerException = require('./../../../src/Back-end/Architecture//Exceptions/serverException');
const CodeDictionary = require('./../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const JsonDB = require('node-json-db');
describe('BaseAction', () => {
    let emptyAction;
    let logInf;
    let baseException;
    beforeEach(() => {

        logInf = sinon.createStubInstance(logFileInf);
        const jsondb = sinon.createStubInstance(JsonDB);
        const dictionaryStub = CodeDictionary({ jsonDbDI: jsondb });
        baseException = new ServerException({ dictionaryDI: dictionaryStub });
        emptyAction = new BaseAction({ logFileInfrastructureDI: logInf, serverExceptionDI: baseException });
    });

    it('constructor() should create empty model', () => {
        let model = null;
        try {
            model = new BaseAction({ logFileInfrastructureDI: logInf });
        } catch (err) {
            model = null;
        }
        expect(model).is.not.equal(null);
    });
    it('init() should set model', () => {
        let model = { 1: 1 };
        emptyAction.init(model);
        expect(emptyAction.model).is.equal(model);
    });

    it('should contain logFileInfrastructureDI', () => {
        expect(emptyAction.logFileInfrastructureDI).is.instanceof(logFileInf);
    });
    it('should contain validationInfrastructureDI', () => {
        expect(emptyAction.validationInfrastructureDI).is.equal(null);
    });

    it('should contain permissionInfrastructureDI', () => {
        expect(emptyAction.permissionInfrastructureDI).is.equal(null);
    });


    it('should contain infrastructureOrder', () => {
        const infrastrcute = sinon.stub(BaseAction.prototype, 'infrastructureOrder');
        //emptyAction.infrastructureOrder();
        infrastrcute.restore();
    });

    it('baseAction should containt commandLogic', () => {
        let command = sinon.stub(BaseAction.prototype, 'commandLogic');
        command.restore();
    });
    it('baseAction should containt run', () => {
        let command = sinon.stub(BaseAction.prototype, 'run');
        command.restore();
    });
    it('baseAction should  run chain', () => {
        let command = sinon.stub(BaseAction.prototype, 'infrastructureOrder');
        emptyAction.run({ "1": 1 });
        sinon.assert.calledOnce(logInf.runChain);
        command.restore();
    });

    it('baseAction should  run infrastrcute order and infrastructure chain', () => {
        let command = sinon.stub(BaseAction.prototype, 'infrastructureOrder');
        emptyAction.run({ "1": 1 });
        sinon.assert.calledOnce(command);
        sinon.assert.calledOnce(logInf.runChain);
        command.restore();
        logInf.runChain.restore();
    });
    it('commandLogic should throw Virtual exception', () => {
        try {
            emptyAction.commandLogic(emptyAction);
        } catch (err) {
            expect(err).instanceof(ServerException);
            return;
        }
        expect(0).is.equal(1);
    });
    it('should contain authInfrastructureDI', () => {
        expect(emptyAction.authInfrastructureDI).is.equal(null);
    });

});
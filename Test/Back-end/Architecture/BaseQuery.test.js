"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const BaseAction = require('./../../../src/Back-end/Architecture/baseAction');
const logFileInf = require('./../../../src/Back-end/Architecture/Infrastructure/logFileInfrastructure');
const ServerException = require('./../../../src/Back-end/Architecture/Exceptions/serverException');
const CodeDictionary = require('./../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const BaseQuery = require('./../../../src/Back-end/Architecture/baseQuery');
const JsonDB = require('node-json-db');
describe('BaseQuery', () => {
    let emptyAction;
    let logInf;
    let baseException;
    beforeEach(() => {

        logInf = sinon.createStubInstance(logFileInf);
        const jsondb = sinon.createStubInstance(JsonDB);
        const dictionaryStub = CodeDictionary({ jsonDbDI: jsondb });
        baseException = new ServerException({ dictionaryDI: dictionaryStub });
        emptyAction = new BaseQuery({ logFileInfrastructureDI: logInf, serverExceptionDI: baseException });
    });

    it('constructor() should create empty model', () => {
        let model = new BaseQuery({ logFileInfrastructureDI: logInf });

        expect(model).is.not.equal(null);
    });

    it('constructor() should create empty model', () => {
        let model = new BaseQuery({ logFileInfrastructureDI: logInf });
        expect(model).instanceof(BaseAction);
    });
    it('should contain couchDbInfrastructureDI', () => {
        expect(emptyAction.couchDbInfrastructureDI).is.equal(null);
    });

    it('should contain dbLogInfrastructureDI', () => {
        expect(emptyAction.dbLogInfrastructureDI).is.equal(null);
    });
    it('should iterate throw infrastructure element  in infrastructure order', () => {
        let reduceStub = sinon.stub(Array.prototype, 'reduce');
        emptyAction.infrastructureOrder();
        sinon.assert.calledOnce(reduceStub);
        reduceStub.restore();

    });

});
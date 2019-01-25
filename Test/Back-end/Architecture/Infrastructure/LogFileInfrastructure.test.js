"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const LogFileInfrastructure = require('./../../../../src/Back-end/Architecture/Infrastructure/logFileInfrastructure');
const BaseInfrastracture = require('./../../../../src/Back-end/Architecture/BaseInfrastructure');
const logger = require('./../../../../src/Back-end/Architecture/logConfig');
const CodeDictionary = require('./../../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const JsonDB = require('node-json-db');
const BaseAction = require('./../../../../src/Back-end/Architecture/baseAction');
describe('LogInfrastructure', () => {
    let emptyInfra = null;
    let dictionaryStub;
    let baseAction = null;
    beforeEach(() => {
        baseAction = sinon.createStubInstance(BaseAction);
        baseAction.commandLogic.callsFake((dto) => { return dto.model; });
        const jsonDBStub = sinon.createStubInstance(JsonDB);
        dictionaryStub = CodeDictionary({ jsonDbDI: jsonDBStub });
        emptyInfra = new LogFileInfrastructure({});
    });

    after(function() {

    });


    it('LogInfrastructure extends BaseInfrastracture', () => {
        expect(emptyInfra).is.instanceof(BaseInfrastracture);
    });

    it('Create empty object', () => {
        expect(emptyInfra.getNext()).is.equal(null);
    });
    it('executeLayer should save info log', () => {

        const infoStub = sinon.stub(logger, 'info');
        emptyInfra.executeLayer({});
        sinon.assert.calledOnce(infoStub);
        infoStub.restore();
    });
    it('executeLayer should return dtoObject', () => {
        const infoStub = sinon.stub(logger, 'info');
        const element = { "1": 1 };
        emptyInfra.executeLayer(element);
        expect(emptyInfra.executeLayer(element)).is.equal(element);
        infoStub.restore();

    });

    it('runChain should run CQ logic function which return unchange CQ element', () => {
        const infoStub = sinon.stub(logger, 'info');
        baseAction.model = { 1: 1 };
        // const element = { "1": 1 };
        // emptyInfra.executeLayer(element);
        expect(emptyInfra.runChain(baseAction)).is.equal(baseAction.model);
        infoStub.restore();
    });

    it('executeLayer should save error log when throw exception', () => {
        const executeLayer = sinon.stub(LogFileInfrastructure.prototype, 'executeLayer').callsFake(function(dtoObject) { throw new TypeError('ERROR'); });
        const errorStub = sinon.stub(logger, 'error');

        try {
            emptyInfra.runChain({ "1": "0" });
        } catch (err) {
            expect(err.message).is.equal('ERROR');
        }
        sinon.assert.calledOnce(errorStub);
        errorStub.restore();
        executeLayer.restore();
    });
});
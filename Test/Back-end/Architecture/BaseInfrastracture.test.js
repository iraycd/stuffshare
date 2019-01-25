"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const BaseInfrastracture = require('./../../../src/Back-end/Architecture/baseInfrastructure');
const CodeDictionary = require('./../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const JsonDB = require('node-json-db');
const BaseAction = require('./../../../src/Back-end/Architecture/baseAction');
const ServerException = require('./../../../src/Back-end/Architecture//Exceptions/serverException');
describe('BaseInfrastracture', () => {
    let emptyInfra;
    let baseAction = null;
    let dictionaryStub;

    beforeEach(() => {
        const jsonDBStub = sinon.createStubInstance(JsonDB);
        dictionaryStub = CodeDictionary({ jsonDbDI: jsonDBStub });
        baseAction = sinon.createStubInstance(BaseAction);
        baseAction.model = { 1: 1 };
        baseAction.commandLogic.callsFake((dto) => { return dto; });
        emptyInfra = new BaseInfrastracture({ serverExceptionDI: new ServerException({ dictionaryDI: dictionaryStub }) });

    });
    after(function() {
        baseAction.commandLogic.restore();
    });
    it('constructor() should create empty Infrastracture Element', () => {
        let model = null;
        try {
            model = new BaseInfrastracture({});
        } catch (err) {
            model = null;
        }
        expect(model).is.not.equal(null);
        //
    });

    it('Empty next element should be null', () => {
        //const model = new BaseInfrastracture();     
        expect(emptyInfra.getNext()).is.equal(null);
    });

    it('Check if next element is not instance of BaseInfrastracture', () => {
        const model = new Date();
        try {
            //  const baseInf = new BaseInfrastracture({ dictionaryDI: dictionaryStub });
            emptyInfra.setNext(model);
        } catch (e) {
            expect(e.Code).is.equal('THIS_IS_NOT_INFRASTRACTURE');
            return;
        }
        expect(1).is.null;
    });

    it('Check if next element is instance of BaseInfrastracture', () => {

        const baseInf = new BaseInfrastracture({});
        baseInf.setNext(emptyInfra);
        expect(baseInf.getNext()).is.instanceof(BaseInfrastracture);
    });

    it('Check if last element is null', () => {
        const baseInf = new BaseInfrastracture({});
        baseInf.setNext(emptyInfra);
        expect(baseInf.getNext().getNext()).is.equal(null);
    });
    it('Create function with logic  of specific layer', () => {
        const executeLayerStub = sinon.stub(BaseInfrastracture.prototype, 'executeLayer');
        executeLayerStub.restore();
    });
    it('execute layer from base infrastracture should throw exception', () => {
        let result = 0;
        try {
            emptyInfra.executeLayer({});
        } catch (e) {
            expect(e.Code).is.equal('VIRTUAL');
            result = 1;
        }
        expect(result).is.equal(1);
    });

    it('Create function which Run Chain of responsibility and if it is last element return unchanged from CQ logic function dtoObject ', () => {
        const baseInf = new BaseInfrastracture({});
        const executeLayerStub = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        expect(baseInf.runChain(baseAction)).is.equal(baseAction);
        sinon.assert.calledOnce(executeLayerStub);
        executeLayerStub.restore();
    });

    it('RunChain should run next element ', () => {
        const nextInf = new BaseInfrastracture({});
        const baseInf = new BaseInfrastracture({});
        baseInf.setNext(nextInf);
        const executeLayerStub = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dtoObject) => { return dtoObject; });
        expect(baseInf.runChain(baseAction)).is.equal(baseAction);
        sinon.assert.calledTwice(executeLayerStub);
        executeLayerStub.restore();
    });

    it('Set next infrastracture by setter', () => {
        const nextInf = new BaseInfrastracture({});
        const baseInf = new BaseInfrastracture({});
        baseInf.setNext(nextInf);
        expect(baseInf.getNext()).is.equal(nextInf);
    });


    it('runChain should run executeLayer', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        expect(emptyInfra.runChain(baseAction)).is.equal(baseAction);
        sinon.assert.calledOnce(executeLayer);
        executeLayer.restore();
    });

    it('runChain should run executeLayer twice in runChain and other infrastracture', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        const element = new BaseInfrastracture({});
        element.setNext(emptyInfra);
        element.runChain(baseAction);
        sinon.assert.calledTwice(executeLayer);
        executeLayer.restore();
    });

    it('run dispose function after runChain', () => {
        const execFunc = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        const disposeFunc = sinon.stub(BaseInfrastracture.prototype, 'dispose');
        emptyInfra.runChain(baseAction);
        sinon.assert.calledOnce(disposeFunc);
        disposeFunc.restore();
        execFunc.restore();
    });

    it('run dispose  function after runChain for 2 elements', () => {
        const execFunc = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        const disposeFunc = sinon.stub(BaseInfrastracture.prototype, 'dispose');
        const element = new BaseInfrastracture({});
        element.setNext(emptyInfra);
        element.runChain(baseAction);
        sinon.assert.calledTwice(disposeFunc);
        disposeFunc.restore();
        execFunc.restore();
    });

    it('Error handling in chain', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake(function(dtoObject) { throw new TypeError('ERROR'); });
        try {
            emptyInfra.runChain(baseAction);
        } catch (err) {
            expect(err.message).is.equal('ERROR');
        }
        executeLayer.restore();
    });
    it('run dispose function after runChain with error', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake(function(dtoObject) { throw new TypeError('ERROR'); });
        const disposeFunc = sinon.stub(BaseInfrastracture.prototype, 'dispose');
        try {
            emptyInfra.runChain(baseAction);
        } catch (err) {

            expect(err.message).is.equal('ERROR');
        }
        sinon.assert.calledOnce(disposeFunc);
        executeLayer.restore();
        disposeFunc.restore();
    });
    it('Error should run exception logic function', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake(function(dtoObject) { throw new TypeError('ERROR'); });
        const errorHandlingFunc = sinon.stub(BaseInfrastracture.prototype, 'errorHandling');
        try {
            emptyInfra.runChain(baseAction);
        } catch (err) {
            expect(err.message).is.equal('ERROR');
        }
        sinon.assert.calledOnce(errorHandlingFunc);
        errorHandlingFunc.restore();
        executeLayer.restore();
    });

    it('Run chain should run function with logic from command or query', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        baseAction.model = "LOGIC";
        expect(emptyInfra.runChain(baseAction).model).is.equal("LOGIC");
        executeLayer.restore();
    });
    it('Run chain should run function with  CQ logic once', () => {
        const executeLayer = sinon.stub(BaseInfrastracture.prototype, 'executeLayer').callsFake((dto) => { return dto; });
        emptyInfra.setNext(new BaseInfrastracture({}));
        emptyInfra.runChain(baseAction);
        sinon.assert.calledOnce(baseAction.commandLogic);
        executeLayer.restore();
    });

});
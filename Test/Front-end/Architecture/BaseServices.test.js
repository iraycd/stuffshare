"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const BaseService = require('./../../../src/Front-end/App/Architecture/baseServices');
const BaseException = require('./../../../src/Shared/Exceptions/baseException');
const JsonDB = require('node-json-db');
const React = require('react');
const axios = require('axios');
describe('BaseServices', () => {
    let emptyService;
    let logInf;
    let baseException;
    let dictionaryStub = null;
    let error = sinon.stub(BaseService.prototype, 'errorHandling');;
    beforeEach(() => {
        error.restore();
        error = sinon.stub(BaseService.prototype, 'errorHandling');;
        baseException = new BaseException();
        emptyService = new BaseService(); 

    });
    after(() => {
        error.restore();
    });
    it('constructor() should create empty model', () => {
        let model = null;
        try {
            model = new BaseService();
        } catch (err) {
            model = null;
        }
        expect(model).is.not.equal(null);
    });

    it('baseService should have function query(action,dtoObject)', () => {
        expect(emptyService.query).is.not.undefined;;
    });
    it('baseService should have function command(action,dtoObject)', () => {
        expect(emptyService.command).is.not.undefined;;
    });

    it('axios should catch exception from server in query', () => {
        const axiosCounter = sinon.stub(Promise.prototype, 'catch');
        emptyService.query('baseAction');
        sinon.assert.calledOnce(axiosCounter);
        axiosCounter.restore();
    });
    it('axios should catch exception from server in command', () => {
        const axiosCounter = sinon.stub(Promise.prototype, 'catch');
        emptyService.command('baseAction');
        sinon.assert.calledOnce(axiosCounter);
        axiosCounter.restore();
    });
    it('command should return promise', () => {
        expect(emptyService.command('baseAction')).instanceof(Promise);
    });
    it('query should return promise', () => {
        expect(emptyService.query('baseAction')).instanceof(Promise);
    });

    it('baseService should implement catch exception handler', () => {
        expect(emptyService.errorHandling).is.not.undefined;;
    });
    /*
    it('error handler in catch  command', () => {
        const axiosCounter = sinon.stub(Promise.prototype, 'catch');
        emptyService.command('baseAction');
        sinon.assert.callOrder(error);
        axiosCounter.restore();
    });

    it('error handler in catch query', () => {
        const axiosCounter = sinon.stub(Promise.prototype, 'catch');
        emptyService.query('baseAction');
        sinon.assert.callOrder(error);
        axiosCounter.restore();
    });
*/
});
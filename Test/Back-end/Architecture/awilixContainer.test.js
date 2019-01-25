"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const container = require('./../../../src/Back-end/Architecture/awilixContainer');
const awilix = require('awilix');
const JsonDB = require('node-json-db');

const { createContainer, asValue, asFunction, asClass } = awilix;
describe('AwilixContainer', () => {
    it('Should create container DI', () => {
        expect(container).is.not.equal(null);
    });

    it('Should be type of createContainer', () => {
        expect(typeof(container)).is.equal(typeof(createContainer()));
    });
    it('Should contain jsonDbDI as registered class', () => {
        expect(container.resolve('jsonDbDI')).is.instanceof(JsonDB);
    });
    it('Should contain dictionaryDI and checkDb should be true( implement JsonDBDi)', () => {
        const element = container.resolve('dictionaryDI');
        expect(element.checkDb()).is.equal(true);
    });
    it('Should contain logInfrastructure ', () => {
        const element = container.resolve('logFileInfrastructureDI');
        expect(element.getNext()).is.equal(null);
    });

    it('If for log infrastructe i want set next element from null then should throw exception as THIS_IS_NOT_INFRASTRUCTURE ', () => {
        const element = container.resolve('logFileInfrastructureDI');
        let counter = 0;
        try {
            expect(element.setNext()).is.equal(null);
        } catch (ex) {
            counter = 1;
        }
        expect(counter).is.equal(1);
    });
    it('From log file infrasctucture should be able to throw and catch exception ', () => {
        const element = container.resolve('logFileInfrastructureDI');
        let counter = 0;
        try {
            expect(element.setNext()).is.equal(null);
        } catch (ex) {
            counter = 1;
        }
        expect(counter).is.equal(1);
    });
    it('Should contain validationInfrascturcture ', () => {
        const element = container.resolve('validationInfrastructureDI');
        expect(element.getNext()).is.equal(null);
    });

    it('Should contain unitOffWorkDI ', () => {
        const element = container.resolve('unitOfWorkDI');
        expect(element).is.not.equal(null);
    });

    it('Should contain baseExceptionDI ', () => {
        const element = container.resolve('serverExceptionDI');
        try {
            expect(element.addValidationError({})).is.equal(null);
        } catch (err) {
            expect(err).is.equal('WRONG_TYPE');
        }
    });
    it('BaseContainer should be able to add validationException', () => {
        const element = container.resolve('serverExceptionDI');
        const vadlidElement = container.resolve('validationExceptionDI');
        element.addValidationError(vadlidElement);
    });
    it('BaseAction should exist in container', () => {
        const element = container.resolve('baseAction');
        expect(element).is.not.equal(null);
    });
    it('BaseCommand should exist in container', () => {
        const element = container.resolve('baseCommand');
        expect(element).is.not.equal(null);
    });
    it('BaseQuery should exist in container', () => {
        const element = container.resolve('baseQuery');
        expect(element).is.not.equal(null);
    });
    it('addToDictionaryCommand should exist in container', () => {
        const element = container.resolve('addToDictionaryCommand');
        expect(element).is.not.equal(null);
    });




});
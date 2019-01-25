"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const baseCommand = require('./../../../src/Back-end/Architecture/baseCommand');
const logFileInf = require('./../../../src/Back-end/Architecture/Infrastructure/logFileInfrastructure');
const ServerException = require('./../../../src/Back-end/Architecture/Exceptions/serverException');
const CodeDictionary = require('./../../../src/Back-end/Architecture//Dictionary/codeDictionary');
const AddToDictionaryCommand = require('./../../../src/Back-end/Commands/Dictionary/addToDictionaryCommand');
const JsonDB = require('node-json-db');
describe('AddToDictionaryCommand', () => {
    let emptyAction;
    let logInf;
    let baseException;
    let dictionaryStub = null;
    beforeEach(() => {

        logInf = sinon.createStubInstance(logFileInf);
        const jsondb = sinon.createStubInstance(JsonDB);
        dictionaryStub = CodeDictionary({ jsonDbDI: jsondb });
        baseException = new ServerException({ dictionaryDI: dictionaryStub });
        emptyAction = new AddToDictionaryCommand({ logFileInfrastructureDI: logInf, serverExceptionDI: baseException, dictionaryDI: dictionaryStub });
    });

    it('constructor() should create empty model', () => {
        let model = null;
        try {
            model = new AddToDictionaryCommand({ logFileInfrastructureDI: logInf });
        } catch (err) {
            model = null;
        }
        expect(model).is.not.equal(null);
    });

    it('Command is instance of BaseCommand', () => {
        expect(emptyAction).is.instanceOf(baseCommand);
    });
    it('Dictionary Set should add code to database', () => {
        const tmp = sinon.stub(dictionaryStub, 'set');
        emptyAction.commandLogic({ "model": { "code": "test" } }); //.is.instanceOf();
        sinon.assert.calledOnce(tmp);
    });


});
"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
const BaseInfrastracture = require('./../../../src/Back-end/Architecture/baseInfrastructure');
const CodeDictionary = require('./../../../src/Back-end/Architecture/Dictionary/codeDictionary');
const JsonDB = require('node-json-db');
const ServerException = require('./../../../src/Back-end/Architecture/Exceptions/serverException');
const unitOfWork = require('./../../../src/Back-end/Architecture/unitOfWork');


describe('UnitOfWork', () => {
    let emptyUnit;

    let dictionaryStub;
    let cluster;
    beforeEach(() => {
       

        emptyUnit = new unitOfWork({  });

    });
    after(function() {

    });
    it('unit of work should containt constructor()', () => {
        emptyUnit = new unitOfWork({});

    });
    
  

  
});
"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect; // we are using the "expect" style of Chai
require('./../../../src/Shared/Helper/commonFunctions');

describe('CommonFunctions', () => {

    it('String.prototype.format is implemented', () => {
        const format = sinon.stub(String.prototype, 'format');
        format.restore();
    });
    it('parameters should replace first {0} template ', () => {

        expect("{0}".format("TEST")).is.equal("TEST");
    });

    it('parameters should replace {0} {1} template ', () => {

        expect("{0} {1}".format("TEST", "GEJ")).is.equal("TEST GEJ");
    });

});
const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const memberModel = require('../models/member');
const memberRoute = require('../routes/member');
const app = require('../app');

describe('post', () => {

    describe('when firstname is left empty', () => {
        it('should throw error', () => {

        });
    });

    describe('when lastname is left empty', () => {
        it('should throw error');
    });

    describe('when birthday is left empty', () => {
        it('should throw error');
    });

});

describe('put', () => {

    describe('when firstname is left empty', () => {
        it('should throw error');
    });

    describe('when lastname is left empty', () => {
        it('should throw error');
    });

    describe('when birthday is left empty', () => {
        it('should throw error');
    });

});

describe('delete', () => {

    describe('when family member is destoryed', () => {
        it('should redirect to home page', () => {
            return request(app).delete("/member/:id/delete")
                .then((res) => {
                    assert.strictEqual(res.status, 301);
                });
        });
    });

});
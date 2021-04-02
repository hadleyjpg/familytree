const express = require('express');
const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
const memberModel = require('../models/member');
const memberRoute = require('../routes/members');
const app = require('../app');
const Member = require('../models').Member;

describe('get', () => {

    describe('when opening app at /', () => {
        it('should redirect to /members', () => {
            return request(app).get('/')
                .then((res) => {
                    assert.strictEqual(res.status, 302);
                });
        });

        it('should render plain text template', async () => {
            return request(app).get('/')
            .then((res) => {
                expect(res.type).to.be.equal('text/plain');
            });
        });

        it('should list out all family members', async () => {
            return request(app).get('/members')
                .expect(200) 
                .then(async (res) => {
                    const members = await Member.findAll();
                });
        });
    });

});

describe('post', () => {

    describe('when editing family member', () => {
        it('should render html template', async () => {
            return request(app).get('/members/19/edit')
            .then((res) => {
                expect(res.type).to.be.equal('text/html');
            });
        });
    });

});

describe('delete', () => {

    describe('when deleting family member', () => {
        it('should render html template', async () => {
            return request(app).get('/members/19/delete')
            .then((res) => {
                expect(res.type).to.be.equal('text/html');
            });
        });
    });

});
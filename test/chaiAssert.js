const { expect } = require('chai');
const request = require('supertest');

const BASE_URL = 'https://reqres.in/api';

describe('ReqRes API Tests', () => {
    // Test GET /users
    describe('GET /users', () => {
        it('should fetch a list of users', async () => {
            const response = await request(BASE_URL)
                .get('/users')
                .query({ page: 2 });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
        });
    });

    // Test POST /register
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const user = {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            };
            const response = await request(BASE_URL)
                .post('/register')
                .send(user);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('token');
        });

        it('should fail to register a new user without a password', async () => {
            const user = {
                email: 'eve.holt@reqres.in'
            };
            const response = await request(BASE_URL)
                .post('/register')
                .send(user);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
        });
    });

    // Test POST /login
    describe('POST /login', () => {
        it('should login a user', async () => {
            const user = {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            };
            const response = await request(BASE_URL)
                .post('/login')
                .send(user);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
        });

        it('should fail to login without a password', async () => {
            const user = {
                email: 'eve.holt@reqres.in'
            };
            const response = await request(BASE_URL)
                .post('/login')
                .send(user);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
        });
    });
});

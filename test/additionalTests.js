const { expect } = require('chai');
const request = require('supertest');

const BASE_URL = 'https://reqres.in/api';

describe('Additional ReqRes API Tests', () => {
    // Test GET /users/{id}
    describe('GET /users/:id', () => {
        it('should fetch a single user by ID', async () => {
            const response = await request(BASE_URL)
                .get('/users/2');

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id', 2);
        });
    });

    // Test PUT /users/{id}
    describe('PUT /users/:id', () => {
        it('should update a user by ID', async () => {
            const user = {
                name: 'morpheus',
                job: 'zion resident'
            };
            const response = await request(BASE_URL)
                .put('/users/2')
                .send(user);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('name', 'morpheus');
            expect(response.body).to.have.property('job', 'zion resident');
        });
    });

    // Test PATCH /users/{id}
    describe('PATCH /users/:id', () => {
        it('should partially update a user by ID', async () => {
            const user = {
                job: 'zion resident'
            };
            const response = await request(BASE_URL)
                .patch('/users/2')
                .send(user);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('job', 'zion resident');
        });
    });

    // Test DELETE /users/{id}
    describe('DELETE /users/:id', () => {
        it('should delete a user by ID', async () => {
            const response = await request(BASE_URL)
                .delete('/users/2');

            expect(response.status).to.equal(204);
        });
    });
});

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Create Product Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Laptop',
                description: 'High performance laptop',
                price: 1200,
                stock: 10,
                category: 'Electronics'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Laptop');
    });
});

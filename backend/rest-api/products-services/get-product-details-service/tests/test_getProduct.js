const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Get Product Details Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return a product if it exists', async () => {
        const testProduct = await request(app)
            .post('/api/products')
            .send({
                name: 'Laptop',
                description: 'High performance laptop',
                price: 1200,
                stock: 10,
                category: 'Electronics'
            });

        const response = await request(app).get(`/api/products/${testProduct.body._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Laptop');
    });

    it('should return 404 if product is not found', async () => {
        const response = await request(app).get('/api/products/64b5f2d2e6b91b001c5a5f23');
        expect(response.status).toBe(404);
    });
});

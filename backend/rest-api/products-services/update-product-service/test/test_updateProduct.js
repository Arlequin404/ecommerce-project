const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Update Product Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should update an existing product', async () => {
        const testProduct = await request(app)
            .post('/api/products')
            .send({
                name: 'Old Laptop',
                description: 'Old version of a laptop',
                price: 900,
                stock: 5,
                category: 'Electronics'
            });

        const response = await request(app)
            .put(`/api/products/${testProduct.body._id}`)
            .send({
                name: 'New Laptop',
                price: 1100
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('New Laptop');
        expect(response.body.price).toBe(1100);
    });

    it('should return 404 if product is not found', async () => {
        const response = await request(app).put('/api/products/64b5f2d2e6b91b001c5a5f23').send({
            name: 'Updated Product'
        });
        expect(response.status).toBe(404);
    });
});

const request = require('supertest');
const app = require('../server');

describe('API Endpoints Tests', () => {
    describe('GET /api/health', () => {
        it('should return server status', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);

            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body.status).toBe('OK');
        });
    });

    describe('GET /api/users', () => {
        it('should return list of users', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(3);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('email');
        });
    });

    describe('POST /api/contact', () => {
        it('should accept valid contact form submission', async () => {
            const contactData = {
                name: 'Jan Testowy',
                email: 'jan.test@example.com',
                message: 'To jest wiadomość testowa'
            };

            const response = await request(app)
                .post('/api/contact')
                .send(contactData)
                .expect(200);

            expect(response.body).toHaveProperty('success');
            expect(response.body).toHaveProperty('message');
            expect(response.body.success).toBe(true);
        });

        it('should reject incomplete contact form submission', async () => {
            const incompleteData = {
                name: 'Jan Testowy',
                email: 'jan.test@example.com'
                // missing message
            };

            const response = await request(app)
                .post('/api/contact')
                .send(incompleteData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should reject empty contact form submission', async () => {
            const response = await request(app)
                .post('/api/contact')
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /', () => {
        it('should return the main HTML page', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.headers['content-type']).toMatch(/html/);
        });
    });

    describe('GET /nonexistent', () => {
        it('should return 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/nonexistent')
                .expect(404);

            expect(response.body).toHaveProperty('error');
        });
    });
});
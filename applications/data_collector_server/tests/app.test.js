const request = require('supertest')
const app = require('../app')

describe('Get health and metric endpoints', () => {
    it('/health', async () => {
        const res = await request(app).get('/health')
        expect(res.status).toEqual(200)
    })

    it('/metrics', async () => {
        const res = await request(app).get('/metrics')
        expect(res.status).toEqual(200)
    })
})
const request = require('supertest')
const app = require('../app')

describe('Post echo user input', () => {
    it('/echo_user_input', async () => {
        const user_input = 'something'
        const res = await request(app).post('/echo_user_input').send({ user_input })
        expect(res.text).toEqual(user_input)
    })
})

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
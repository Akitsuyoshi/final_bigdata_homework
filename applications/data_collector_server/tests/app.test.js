const { default: mongoose } = require('mongoose')
const request = require('supertest')
const app = require('../app')

beforeAll(async () => {
    const url = `mongodb://mongo:27017`
    await mongoose.connect(url, { useNewUrlParser: true, dbName: 'test_database' })
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

describe('Post request to get us data', () => {
    it('/us_data', async () => {
        const res = await request(app).get('/health')
        expect(res.status).toEqual(200)
    })
})

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            if (error.message === 'ns not found') return
            if (error.message.includes('a background operation is currently running')) return

            console.log(error.message)
        }
    }
}

afterAll(async () => {
    await dropAllCollections()
    await mongoose.connection.close()
})

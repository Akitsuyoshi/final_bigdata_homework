const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const promMid = require('express-prometheus-middleware');
const mongoose = require('mongoose')
const populationModel = require('./population')

if (process.env.NODE_ENV !== 'production') {
    mongoose.connect('mongodb://mongo:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'my_database'
    }).catch((err) => {
        console.log(err)
        console.log('MongoDB connection error')
    })
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}))

const promiseRequest = (url) => new Promise((resolve, reject) => {
    request({ url, json: true }, (err, res, body) => {
        if (!err && res.statusCode == 200) resolve(body)
        else reject(err)
    })
})

app.get('/health', (req, res) => {
    res.status(200).send("ok")
})

app.post('/us_data', async (req, res) => {
    try {
        const result = await promiseRequest('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
        result['data'].forEach(obj => {
            const populationInstance = new populationModel({
                nation: obj['Nation'],
                year: obj['ID Year'],
                population: obj['Population'],
            })
            populationInstance.save()
        });
    } catch (err) {
        console.log(err)
        res.status(500).send('Bad request')
    } finally {
        res.status(200).send("Save US's data to db")
    }
})

app.get('/us_data', async (req, res) => {
    try {
        const us_data = await populationModel.find({ nation: 'United States' }).sort({ year: -1 })
        res.status(200).send(us_data)
    } catch (err) {
        console.log(err)
    }
})

module.exports = app
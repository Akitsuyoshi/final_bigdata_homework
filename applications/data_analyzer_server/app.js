const express = require('express')
const app = express()
const path = require('path')
const promMid = require('express-prometheus-middleware');
const mongoose = require('mongoose')

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

app.get('/health', (req, res) => {
    res.status(200).send("ok")
})

module.exports = app
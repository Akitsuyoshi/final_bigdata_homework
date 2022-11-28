const express = require('express')
const app = express()
const path = require('path')
const promMid = require('express-prometheus-middleware');
const amqplib = require('amqplib')
const amqpUrl = process.env.AMPQ_URL || 'amqp://rabbitmq:5672'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}))

const connect = async (connection, channel, amqpObj, msg) => {
    connection = await amqplib.connect(amqpUrl, 'heartbeat=60')
    channel = await connection.createChannel()
    const { exchange, queue, routingKey } = amqpObj
    await channel.assertExchange(exchange, 'direct', { durable: true })
    await channel.assertQueue(queue, { durable: true })
    await channel.bindQueue(queue, exchange, routingKey)
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)))
    console.log('Message published')
}


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/health', (req, res) => {
    res.status(200).send("ok")
})

app.post('/echo_user_input', (req, res) => {
    res.send(req.body.user_input)
})

app.post('/rabbit_publish', async (req, res) => {
    let connection
    let channel
    try {
        const amqpObj = {
            exchange: 'sample_exchange',
            queue: 'sample_queue',
            routingKey: '1',
        }
        const msg = { 'id': 'sample', 'body': 'first_msg' }
        await connect(connection, channel, amqpObj, msg)
        res.send(msg)
    } catch (err) {
        console.log('error in publishing message: ', err)
    }
})

module.exports = app
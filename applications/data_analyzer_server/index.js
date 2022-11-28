const port = process.env.PORT || 3001
const app = require('./app')
const amqplib = require('amqplib')
const amqpUrl = process.env.AMQP_URL || 'amqp://rabbitmq:5672'

const processMessage = async (msg) => {
    console.log('Received message: ' + msg.content.toString())
    // Some async function follows here
}

const connect = async (mseconds) => {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60')
    const channel = await connection.createChannel()
    channel.prefetch(10)
    // process.once('SIGINT', async () => {
    //     await channel.close()
    //     await connection.close()
    //     process.exit(0)
    // })

    const queue = 'sample_queue'
    await channel.assertQueue(queue, { durable: true })
    await channel.consume(queue, async (msg) => {
        await processMessage(msg)
        await channel.ack(msg)
    }, {
        noAck: false,
        consumerTag: 'sample_consumer'
    })
    console.log('Waiting for the message')
}
connect()

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})

app.use((req, res,) => {
    res.status(404).send("Sorry can't find the page: " + req.originalUrl)
})
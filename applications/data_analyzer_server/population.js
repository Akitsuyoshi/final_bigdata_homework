const mongoose = require('mongoose')

const populationSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nation: String,
    year: Number,
    population: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model(
    'Population',
    populationSchema
)
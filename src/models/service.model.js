const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: String,
    baseCost: Number,
    numberOfMovers: Number,
    laborCostPerMinute: Number,
    costPerMile: Number
}, { timestamps: true});

module.exports = mongoose.model('Services', serviceSchema);
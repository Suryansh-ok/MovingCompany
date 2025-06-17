const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    service: { type: mongoose.Schema.ObjectId, ref: 'Service', required: true},
    origin: { type: String, required: true},
    destination: { type: String, required: true},
    movingDate: { type: Date, required: true},
    distanceMiles: { type: Date, required: true},
    estimatedTime: { type: Number, required: true},
    estimatedCost: { type: Number, required: true},
    status : { type: String, enum: ['pending', 'assigned', 'onTheWay', 'started', 'payNow', 'completed', 'cancelled' ]},
}, { timestamps: true});

module.exports = mongoose.model('Job', jobSchema);


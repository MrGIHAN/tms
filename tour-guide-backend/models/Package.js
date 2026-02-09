const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    description: String,
    totalPrice: Number,
    itinerary: [{
        day: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        hotel: String,
        activities: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Package', packageSchema);
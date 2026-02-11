const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    description: String,
    maximumPassenger: {
        type: Number,
        required: true
    },
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }],
    contactNumber: String,
    email: String,
    photoGallery: [{
        location: String,
        photoUrl: String,
        isThumbnail: {
            type: Boolean,
            default: false
        }
    }],
    location: [String],
    price: {
        type: Number,
        required: true
    },
    vehicleType: String,
    vehicleCount: Number,
    itinerary: [{
        location: {
            type: String,
            required: true
        },
        activities: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Package', packageSchema);
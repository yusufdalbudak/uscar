const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    shortDescription: {
        type: String,
        required: false,
        default: ''
    },
    dailyPrice: {
        type: Number,
        required: true,
        default: 0
    },
    transmission: {
        type: String,
        required: true,
        enum: ['Otomatik', 'Manuel']
    },
    fuelType: {
        type: String,
        required: true,
        enum: ['Benzin', 'Dizel', 'Elektrik', 'Hibrit']
    },
    passengers: {
        type: Number,
        required: true,
        default: 5
    },
    features: {
        type: [String],
        default: []
    },
    galleryImageUrls: {
        type: [String],
        default: []
    },
    imageUrl: {
        type: String,
        required: false,
        default: 'https://via.placeholder.com/400x250.png?text=US-CAR'
    },
    category: {
        type: String,
        required: true,
        enum: ['ekonomik', 'orta', 'lüks']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 
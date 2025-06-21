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
    imageUrl: {
        type: String,
        required: false,
        default: 'https://via.placeholder.com/400x250.png?text=US-CAR'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 
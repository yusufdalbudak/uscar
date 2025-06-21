require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to accept JSON data

// Rotaları Tanımla
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));

// --- Database Connection ---
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB veritabanına başarıyla bağlandı.'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

// A simple test route
app.get('/', (req, res) => {
    res.send('US-CAR Backend Sunucusu Çalışıyor!');
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde başlatıldı.`);
}); 
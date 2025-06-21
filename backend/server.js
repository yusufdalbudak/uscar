require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to accept JSON data

// API Rotalarını Tanımla
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));

// Statik dosyaları sun (HTML, CSS, JS, Resimler vb.)
// Bu bölüm API rotalarından SONRA gelmeli.
app.use(express.static(path.join(__dirname, '..')));

// --- Database Connection ---
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB veritabanına başarıyla bağlandı.'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

// API dışındaki tüm GET istekleri için index.html'i sun
// Bu, en sonda kalmalı.
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde başlatıldı.`);
}); 
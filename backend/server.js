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

// Statik dosyaları sun (HTML, CSS, JS, Resimler vb.)
// __dirname, backend klasörünün yolunu verir. '..' ile bir üst dizine (proje kök dizinine) çıkarız.
app.use(express.static(path.join(__dirname, '..')));

// Rotaları Tanımla
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));

// --- Database Connection ---
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB veritabanına başarıyla bağlandı.'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Kök dizin dışındaki tüm istekler için index.html'i sun (Single Page Application desteği için)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde başlatıldı.`);
}); 
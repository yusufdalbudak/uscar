const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: false, default: '' },
    content: { type: String, required: false, default: '' }, // SSS ve detaylı açıklama için

    // Fiyat ve Kategori
    dailyPrice: { type: Number, required: true, default: 0 },
    category: { type: String, required: true, enum: ['ekonomik', 'orta', 'lüks'] },

    // Ana Özellikler
    transmission: { type: String, required: true, enum: ['Otomatik', 'Manuel'] },
    fuelType: { type: String, required: true, enum: ['Benzin', 'Dizel', 'Elektrik', 'Hibrit'] },
    passengers: { type: Number, required: true, default: 5 },
    doorCount: { type: Number, required: false, default: 4 },
    luggageCapacity: { type: String, required: false, default: 'N/A' },

    // Teknik Özellikler
    modelYear: { type: String, required: false, default: 'Bilinmiyor' },
    bodyType: { type: String, required: false, default: 'Bilinmiyor' },
    engineVolume: { type: String, required: false, default: 'Bilinmiyor' },
    fuelConsumption: { type: String, required: false, default: 'Bilinmiyor' },
    carbonEmission: { type: String, required: false, default: 'Bilinmiyor' },

    // Kiralama Koşulları
    minLicenseAge: { type: Number, required: false, default: 1 },
    minDriverAge: { type: Number, required: false, default: 21 },

    // Ek Donanım ve Görseller
    features: { type: [String], default: [] },
    imageUrl: { type: String, required: true, default: 'https://via.placeholder.com/400x250.png?text=US-CAR' },
    galleryImageUrls: { type: [String], default: [] },

    createdAt: { type: Date, default: Date.now }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car; 
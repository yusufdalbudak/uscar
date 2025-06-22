const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); // Car modelini import et
const auth = require('../middleware/auth'); // Auth middleware'ini import et

// @route   GET api/cars
// @desc    Tüm araçları getir (kategoriye göre filtreli)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};
        if (category && category !== 'all' && ['ekonomik', 'orta', 'lüks'].includes(category)) {
            filter.category = category;
        }
        const cars = await Car.find(filter).sort({ createdAt: -1 });
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

// @route   GET api/cars/:id
// @desc    Tek bir aracı ID ile getir
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ msg: 'Araç bulunamadı' });
        }

        res.json(car);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Araç bulunamadı' });
        }
        res.status(500).send('Sunucu Hatası');
    }
});

// @route   POST api/cars
// @desc    Yeni bir araç oluştur
// @access  Private
router.post('/', auth, async (req, res) => {
    // Car modelindeki tüm alanları body'den al
    const {
        title, shortDescription, content, dailyPrice, category,
        transmission, fuelType, passengers, doorCount, luggageCapacity,
        modelYear, bodyType, engineVolume, fuelConsumption, carbonEmission,
        minLicenseAge, minDriverAge, features, imageUrl, galleryImageUrls
    } = req.body;

    try {
        const newCar = new Car({
            title, shortDescription, content, dailyPrice, category,
            transmission, fuelType, passengers, doorCount, luggageCapacity,
            modelYear, bodyType, engineVolume, fuelConsumption, carbonEmission,
            minLicenseAge, minDriverAge, features, imageUrl, galleryImageUrls
        });

        const car = await newCar.save();
        res.json(car);
    } catch (err) {
        console.error('API Hatası:', err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

// @route   DELETE api/cars/:id
// @desc    Bir aracı ID ile sil
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ msg: 'Araç bulunamadı' });
        }

        await car.deleteOne();

        res.json({ msg: 'Araç başarıyla silindi' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

module.exports = router; 
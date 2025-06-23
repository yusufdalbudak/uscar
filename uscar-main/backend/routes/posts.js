const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// @route   GET api/posts
// @desc    Tüm blog yazılarını getir
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

// @route   GET api/posts/:id
// @desc    Tek bir yazıyı ID ile getir
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Yazı bulunamadı' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Yazı bulunamadı' });
        }
        res.status(500).send('Sunucu Hatası');
    }
});

// @route   POST api/posts
// @desc    Yeni bir blog yazısı oluştur
// @access  Private
router.post('/', auth, async (req, res) => {
    const {
        title,
        content,
        imageUrl
    } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            imageUrl
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

// @route   DELETE api/posts/:id
// @desc    Bir yazıyı ID ile sil
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Yazı bulunamadı' });
        }

        await post.deleteOne();

        res.json({ msg: 'Yazı başarıyla silindi' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

module.exports = router; 
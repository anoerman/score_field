const express = require('express')
const router = express.Router()
const GamePreset = require('../models/GamePreset')
const { ensureAuth } = require('../middlewares/auth')

// Show all game preset
router.get('/', ensureAuth, async (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.redirect('/')
    }
    const list = await GamePreset.find().sort({ createdAt: -1 })
    res.render('game-preset/index', { list })
})

router.get('/new', ensureAuth, (req, res) => {
    if (!req.session.user.isAdmin) {
        return res.redirect('/')
    }
    res.render('game-preset/new')
})

router.post('/new', ensureAuth, async (req, res) => {
    try {
        console.log(req.body);
        const inputBody = req.body;
        await GamePreset.create({
            ...inputBody,
        });
        req.session.flash = { type: 'success', message: `Preset permainan berhasil disimpan.` };
        res.redirect('/game-presets');
    } catch (e) {
        console.error(e);
        req.session.flash = { type: 'danger', message: 'Gagal menyimpan preset permainan.' };
        res.redirect('/game-presets');
    }
})

module.exports = router
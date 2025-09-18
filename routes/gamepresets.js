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
    res.render('gamepresets', { list })
})

module.exports = router
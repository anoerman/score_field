const express = require('express')
const router = express.Router()
const Match = require('../models/Match')
const GamePreset = require('../models/GamePreset')
const { ensureAuth } = require('../middlewares/auth')

// Helper
function computeWinner(players, maxScore, winByTwo) {
    const scores = players.map(p => p.score)
    const topIdx = scores.indexOf(Math.max(...scores))
    const topScore = scores[topIdx]
    const second = Math.max(...scores.filter((s, i) => i !== topIdx))

    if (!winByTwo) {
        if (topScore >= maxScore) return players[topIdx].name
        return null
    } else {
        if (topScore >= maxScore && (topScore - (second === -Infinity ? 0 : second)) >= 2) {
            return players[topIdx].name
        }
        return null
    }
}

// Landing - choose match type
router.get('/', (req, res) => {
    res.render('index')
})

// Setup match
router.get('/setup', async (req, res) => {
    const gamePresets = await GamePreset.find().sort({ name: 1 })
    if (!gamePresets) return res.redirect('/')
    res.render('setup', { gamePresets })
})

// Save setup
router.post('/setup', async (req, res) => {
    const { gameId, playerNames } = req.body
    const names = (playerNames || '')
        .split(',')
        .map(n => n.trim())
        .filter(Boolean)

    // Get game
    const gameDetail = await GamePreset.findById(gameId)
    if (!gameDetail) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const total = parseInt(gameDetail.totalPlayers || names.length || 2, 10)
    const players = Array.from({ length: total }).map((_, i) => ({
        name: names[i] || `Player ${i + 1}`,
        score: 0
    }))

    req.session.currentMatch = {
        gameName: gameDetail.name || 'Custom Game',
        totalPlayers: gameDetail.totalPlayers,
        maxScore: parseInt(gameDetail.maxScore || 21, 10),
        allowNegative: !!gameDetail.allowNegative,
        winByTwo: !!gameDetail.winByTwo,
        players,
        status: 'ongoing',
        winner: null
    }

    res.redirect('/scoreboard')
})

// Score board from session (temporary)
router.get('/scoreboard', (req, res) => {
    const match = req.session.currentMatch
    if (!match) return res.redirect('/setup')
    res.render('scoreboard', { match })
})

// Save to DB (need user to login and save)
// Simpan pertandingan ke DB (butuh login)
router.post('/scoreboard/save', ensureAuth, async (req, res) => {
    try {
        const matchData = JSON.parse(req.body.matchData);
        const doc = await Match.create({
            ...matchData,
            createdBy: req.session.user.id,
        });
        req.session.flash = { type: 'success', message: `Pertandingan disimpan (#${doc._id}).` };
        res.redirect('/matches');
    } catch (e) {
        console.error(e);
        req.session.flash = { type: 'danger', message: 'Gagal menyimpan pertandingan.' };
        res.redirect('/scoreboard');
    }
});

// List of saved matches
router.get('/matches', ensureAuth, async (req, res) => {
    let userFilter = {}
    if (!req.session.user.isAdmin) {
        userFilter = { createdBy: req.session.user.id }
    }
    const list = await Match.find(userFilter)
        .populate('createdBy', 'username isAdmin')
        .sort({ createdAt: -1 })
    res.render('matches', { list })
})

module.exports = router
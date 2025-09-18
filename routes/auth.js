const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
        req.session.flash = { type: 'danger', message: 'Wrong username or password!' }
        return res.redirect('/auth/login')
    }
    req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin ?? false }
    res.redirect('/matches')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const exists = await User.findOne({ username })
        if (exists) {
            req.session.flash = { type: 'warning', message: 'Username is already used!'}
            return res.redirect('/auth/register')
        }
        const user = new User({ username, password })
        await user.save()
        req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin ?? false }
        res.redirect('/matches')
    } catch (e) {
        console.error(e)
        req.session.flash = { type: 'danger', message: 'User registration failed!'}
        res.redirect('/auth/register')
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router
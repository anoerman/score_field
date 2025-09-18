require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const { v4: uuidv4 } = require('uuid')

// Set routes
const authRoutes = require('./routes/auth')
const matchRoutes = require('./routes/matches')
const gamePresetRoutes = require('./routes/gamepresets')

// Set express
const app = express()
const PORT = process.env.PORT || 3000

// Connect mongo
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB is connected!'))
    .catch(err => console.log('MongoDB connection error: ', err))

// View engine & static dir
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// Session (play without user)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}))

// Inject user to views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null
    res.locals.flash = req.session.flash || null
    delete req.session.flash
    next()
})

// Routes
app.use('/', matchRoutes); // landing, setup, scoreboard, list of matches
app.use('/auth', authRoutes); // login, register, logout
app.use('/game-presets', gamePresetRoutes); // list of presets

// 404
app.use((req, res) => {
    res.status(404).send('Not Found!')
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
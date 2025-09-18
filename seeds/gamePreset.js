require('dotenv').config()
const mongoose = require('mongoose')
const GamePreset = require('../models/GamePreset')

const presets = [
    { name: "Badminton", totalPlayers: 2, maxScore: 21, allowNegative: false, winByTwo: false },
    { name: "Pingpong", totalPlayers: 2, maxScore: 11, allowNegative: false, winByTwo: false },
    { name: "Soccer", totalPlayers: 2, maxScore: 0, allowNegative: false, winByTwo: false },
]

async function seed() {
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI)
    await GamePreset.deleteMany({})
    await GamePreset.insertMany(presets)
    console.log("Game preset seeded!")
    process.exit()
}

seed()
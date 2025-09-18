const mongoose = require('mongoose')

const gamePresetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalPlayers: { type: Number, min: 1, default: 2 },
    maxScore: { type: Number, min: 0 },
    allowNegative: { type: Boolean, default: false },
    winByTwo: { type: Boolean, default: false },

}, { timestamps: true })

module.exports = mongoose.model('GamePreset', gamePresetSchema)
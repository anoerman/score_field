const mongoose = require('mongoose')
const { validate } = require('./User')

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    score: { type: Number, default: 0 }
})

const matchSchema = new mongoose.Schema({
    gameName: { type: String, required: true },
    totalPlayers: { type: Number, min: 1, default: 2 },
    maxScore: { type: Number, min: 0 },
    allowNegative: { type: Boolean, default: false },
    winByTwo: { type: Boolean, default: false },
    players: { type: [playerSchema], validate: v => v && v.length > 0 },
    status: { type: String, enum: ['ongoing', 'finished'], default: 'ongoing' },
    winner: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Match', matchSchema)
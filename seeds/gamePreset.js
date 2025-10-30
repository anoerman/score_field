const GamePreset = require('../models/GamePreset')
module.exports = async function seedGamePresets() {
    const presets = [
        { name: "Badminton", totalPlayers: 2, maxScore: 21, allowNegative: false, winByTwo: false },
        { name: "Pingpong", totalPlayers: 2, maxScore: 11, allowNegative: false, winByTwo: false },
        { name: "Soccer", totalPlayers: 2, maxScore: 0, allowNegative: false, winByTwo: false },
    ]
    
    await GamePreset.deleteMany({})
    await GamePreset.insertMany(presets)
    console.log(`✅ ${presets.length} game presets seeded!`)
}
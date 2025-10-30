require("dotenv").config()
const { default: mongoose } = require("mongoose")
const seedUsers = require("./user")
const seedGamePresets = require("./gamePreset")

// Map seeder
const seeders = {
    users: seedUsers,
    gamePresets: seedGamePresets,
    all: async () => {
        await seedUsers()
        await seedGamePresets()
    }
}

async function runSeed() {
    const arg = process.argv[2] || 'all' // Default jalankan semua seed
    const seederFn = seeders[arg]

    if (!seederFn) {
        console.error(`❌ Seeder "${arg}" tidak ditemukan.`);
        console.log('Gunakan salah satu dari: users | gamePresets | all');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI)        
        console.log("✅ Mongodb is connected.")

        await seederFn()
        console.info(`✅ Seeding ${arg} complete!`)
    } catch (err) {
        console.error("❌ Seeding failed! ", err)
    } finally {
        await mongoose.disconnect()
        process.exit()
    }
}

runSeed()
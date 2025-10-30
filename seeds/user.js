const User = require('../models/User')

module.exports = async function seedUsers() {
    const exists = await User.findOne({ username: 'admin' })
    if (exists) {
        console.log('❌ Admin user is already exists!')
        return
    }

    const datas = new User(
        { username: "admin", password: "admin", isAdmin: true },
    )
    
    await datas.save()
    console.log("✅ Admin user is successfully created!")
}

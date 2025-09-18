module.exports.ensureAuth = (req, res, next) => {
    if (!req.session.user) {
        req.session.flash = {type: 'warning', message: 'Please login to save match result'}
        return res.redirect('/auth/login')
    }
    next()
}
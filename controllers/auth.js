
module.exports = {

    // GET login page
    getLogin : ( req, res ) => {

        res.render('auth/login', { pageTitle : 'login'})

    },

    // POST login page
    doLogin : ( req, res ) => {

        res.redirect( '/')

    }

}
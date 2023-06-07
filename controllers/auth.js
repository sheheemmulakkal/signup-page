
module.exports = {

    // GET login page
    getLogin : ( req, res ) => {

        res.render('auth/login', { pageTitle : 'login'})

    },

    // POST login page
    doLogin : ( req, res ) => {

        res.redirect( '/' )

    },

    //GET signup page
    getSignup : ( req, res ) => {

        res.render('auth/signup', {pageTitle : 'signup'})
    },

    //POST signup page 
    doSignup : ( req, res ) => {

        res. redirect( '/' )
    }

}
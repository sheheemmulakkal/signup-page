const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = {

    // GET login page
    getLogin : ( req, res ) => {

       if( req.session.loggedIn) {
        res.redirect('/')
       } else {
        res.render('auth/login', { pageTitle : 'login'} )
       }
        
    },

    // POST login page
    doLogin : async( req, res ) => {


        try {
            
            const user = await User.findOne( {email : req.body.email} )

            if ( user ) {
                const password =  await bcrypt.compare( req.body.password, user.password )
                console.log(password);

                if( password ) {

                    req.session.user = user
                    req.session.loggedIn = true

                    res.redirect( '/' )
                } else {
                    res.render( 'auth/login', {pageTitle : 'login', errPswd : true} )
                }

            } else {
                res.render( 'auth/login', {pageTitle : 'login', errUser : true} )
            }

        } catch (error) {
            console.log( 'hiii'+error.message );
        }

    },

    //GET signup page

    getSignup : ( req, res ) => {
        if(req.session.loggedIn){
            res.redirect('/')
        } else {
            res.render('auth/signup', {pageTitle : 'signup'} )

        }
    },

    //POST signup page 
    doSignup : async( req, res ) => {

        try {

            const userData = await User.findOne( {email : req.body.email} )

            if ( userData ) {

                return res.render('auth/signup', {userExist : true, pageTitle: 'signup'})
            
            } else {

                const password = await bcrypt.hash( req.body.password, 12 )

                const user = new User({
                    name : req.body.name,
                    password : password,
                    email : req.body.email
                })

                const result = await user.save()

                req.session.user = user
                req.session.loggedIn = true

                res.redirect('/')

            }

        } catch(error) {
            console.log(error.message);
        }

    },

    doLogout : ( req, res ) => {

        req.session.destroy()
        res.redirect('/login')

    }

}
const User = require('../models/user')
const bcrypt = require('bcryptjs')

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


        User.findOne({email : req.body.email})
        .then( userResult => {

            if(userResult) {
                return res.render( 'auth/signup', { userExist : true, pageTitle: 'signup'})
            } else {

                bcrypt.hash(req.body.password, 12)
                .then( password => {

                    const user = new User({
                        name : req.body.name,
                        password : password,
                        email : req.body.email
                    })
                    
                    return user.save()

                })
                .then( result => {

                    console.log(result);
                    res.redirect( '/' )
                    
                })

            }
        })

    }

}
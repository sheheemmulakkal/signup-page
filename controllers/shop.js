

module.exports = {

    getHomePage : ( req, res ) => {

        if(req.session.user) {

            res.render( 'shop/home', {user : req.session.loggedIn} )

        } else {

            res.redirect( '/login' )

        }
    }

}
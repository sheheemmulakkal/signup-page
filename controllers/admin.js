const User = require('../models/user')
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')


module.exports = {

    getAdminHome : async( req, res ) => {

        try {
            if(req.session.admin) {

                const user = await User.find().lean()

                res.render( 'admin/user-list', {admin: req.session.admin, users : user})
            } else {
                res.redirect('/admin/login')
            }
    
        } catch (error) {
            console.log(error.message);
        }

    },

    getAdminLogin : ( req, res ) => {

        if(req.session.admin) {
            res.redirect( '/admin' )
        } else {
            res.render('admin/admin-login' , {adminLogin: true})
        }

    },

    doAdminLogin : async( req, res ) => {

        try {
            const admin = await Admin.findOne({email : req.body.email })

            if( admin ) {
                const password = bcrypt.compare(req.body.password, admin.password )

                if( password ) {
                    req.session.admin = true
                    res.redirect( '/admin')
                } else {
                    res.render('admin/admin-login', {errPswd : true})
                }
            } else {
                res.render('admin/admin-login', {errUser : true})
            }
        } catch ( error) {
            console.log(error.message);
        }

    },

    adminLogout : ( req, res ) => {

        req.session.destroy()
        res.redirect('/admin/login')

    },

    getEditUser : async ( req, res ) => {

        const user = await User.find({_id : req.query.id}).lean()
        
        res.render('admin/edit-user',{user : user })
    },

    updateUser : async( req, res ) => {
        
       try {
            const user = await User.updateOne({
                    _id : req.body.id
                },
                {
                    $set : {
                        name: req.body.name,
                        email: req.body.email
                    }
                })
                
            res.redirect('/admin')
    
       } catch (error ) {
            console.log(error.message);
        }
    },

    deleteUser : async( req, res ) => {
        
        const user = await User.deleteOne({_id : req.query.id})

        res.redirect('/admin')

    }

}
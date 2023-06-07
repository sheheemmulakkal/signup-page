const express = require('express')

const adminController = require('../controllers/admin')
const admin = require('../models/admin')

const router = express.Router()

router.get('/', adminController.getAdminHome )

router.get('/login', adminController.getAdminLogin)

router.post( '/login', adminController.doAdminLogin)

router.get( '/logout', adminController.adminLogout)

router.get( '/edit-user', adminController.getEditUser)

router.post( '/edit-user', adminController.updateUser)

router.get( '/delete-user', adminController.deleteUser)


module.exports = router



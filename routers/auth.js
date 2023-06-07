const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()

router.get( '/login', authController.getLogin )

router.post( '/login', authController.doLogin )

router.get( '/signup', authController.getSignup )

router.post( '/signup', authController.doSignup )

router.get( '/logout', authController.doLogout )


module.exports = router
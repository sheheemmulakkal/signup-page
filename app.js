const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')
const path = require('path')

const app = express()


// Setting view engine (Express handlebars)
app.engine( 'hbs',
    expressHbs.engine({
        partialsDir : path.join( __dirname, 'views', 'partials' ), 
        layoutsDir : path.join( __dirname, 'views', 'layout'),
        defaultLayout : 'main-layout',
        extname : 'hbs'
    }))

app.set('view engine', 'hbs')
app.set('views', 'views')


// Setting public static folder
app.set(express.static( path.join(__dirname, 'public')))


// Using bodyParser
app.use( bodyParser.urlencoded({ extended:false}) )


// Requiring Routers
const adminRouter = require('./routers/admin')
const authRouter = require('./routers/auth')
const shopRouter = require('./routers/shop')


// Using Routers
app.use( shopRouter)
app.use( authRouter)
app.use( '/admin', adminRouter )

app.listen(3000)
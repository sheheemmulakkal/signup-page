const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressHbs = require('express-handlebars')
const path = require('path')

const app = express()

// HANDLEBARS ENGINE CONFIGURATION
// setting helper function to check if the value is equal
const ifEqual = function(value1, value2, options) {
    if (value1 === value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  };

// Creating hbs engine
app.engine( 'hbs',
    expressHbs.engine({
        partialsDir : path.join( __dirname, 'views', 'partials' ), 
        layoutsDir : path.join( __dirname, 'views', 'layout'),
        defaultLayout : 'main-layout',
        extname : 'hbs',
        helpers : {
            ifEqual : ifEqual
        }
    }))

app.set('view engine', 'hbs')
app.set('views', 'views')



// Setting public static folder
app.use(express.static( path.join(__dirname, 'public')))


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


// Database connection (mongoose) and port listen
mongoose.connect( 
    'mongodb://127.0.0.1:27017/'
)
.then( result => {
    app.listen(3000)
})
.catch( err => {
    throw err
})
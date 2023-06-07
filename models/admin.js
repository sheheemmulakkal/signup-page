const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Admin = new Schema({


    password : {
        type : String,
        requried : true
    },

    email : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('admin', Admin)
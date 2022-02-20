const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String
    },
    firstname:{
        type: String,
        default: '' 
    },
    lastname:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        unique: true
    },
    token:{
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
})

var Users = mongoose.model('user', UserSchema)
module.exports = Users
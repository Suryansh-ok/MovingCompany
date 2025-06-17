const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : { type: String, required: true},
    password : { type: String , required: true},
    profilePhoto: {type: String, default: ''},
    resetToken: String,
    resetTokenExpiry: Date
}, {timestamps : true});

module.exports = mongoose.model('User', userSchema);
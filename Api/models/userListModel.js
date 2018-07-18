'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: 'Kindly enter the Username',
        unique: true
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: 'Enter a Password'
    },
    profilepicture: {
        type: String,
        default: ""
    },
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    friendRequests: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('User', UserSchema);
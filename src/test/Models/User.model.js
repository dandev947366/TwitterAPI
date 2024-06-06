const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema
main().catch(err => console.log(err));

const UserSchema = new Schema({

    emai:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserSchema)
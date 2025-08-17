import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    displayName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:[
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please use a valid email address'
        ]
    },

    hashPassword:{
        type: String,
        required: true,
    },

    role:{
        type: String,
        required: true,
        enum: ['admin', 'customer', 'guest'],
    },

    avatar:{
        type: String,
        required: true,
        default: 'https://placehold.co/100x100.png',
    },

    phone:{
        type: String,
        max: 10,
    },

    isActive:{
        type: Boolean,
        default: true,
    },
});

const user = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'email id is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password if required']
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'vendor', 'driver', 'admin']
    },
    profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png'
    },
    answer: {
        type:String,
        required:[true,"Answer is required"]
    },

}, {
    timestamps: true
});

module.exports = mongoose.model("user",userSchema);

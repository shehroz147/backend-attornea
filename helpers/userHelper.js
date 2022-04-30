// Mongoose
const mongoose = require("mongoose");

// Models
const User = require("../models/userModel");



exports.findUser = async (email, password) => {
    return await User.find({
        email: email,
        isVerified: true,
        password: password
    });
}

exports.findUserPass = async (email, pass) => {
    return await User.find({ email: email, password: pass });
}

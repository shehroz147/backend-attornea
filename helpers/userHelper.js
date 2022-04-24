// Mongoose
const mongoose = require("mongoose");

// Models
const User = require("../models/userModel");



exports.findUser = async (email) => {
    return await User.find({ email: email }, { isVerified: true });
}

exports.findUserPass = async (email, pass) => {
    return await User.find({ email: email, password: pass });
}

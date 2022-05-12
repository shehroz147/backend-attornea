const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, unique: "That email is already taken", required: true },
    password: { type: String, required: true },
    token: { type: String },
    workExperience: { type: String },
    education: { type: String },
    gender: { type: String },
    country: { type: String },
    bio: { type: String },
    praticeArea: { type: String },
    lisenceNo: { type: Number },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["User", "Lawyer"], required: true, default: "User" },
    status: { type: String, enum: ["Inactive", "Active"], default: "Inactive" },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

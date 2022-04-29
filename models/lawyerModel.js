const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, unique: "That email is already taken", required: true },
    password: { type: String, required: true },
    token: { type: String },
    praticeArea: { type: String },
    gender: { type: String },
    lisenceNo: { type: Number },
    bio: { type: String },
    // role :{ type: String, enum: ["User", "Lawyer"], required: true,  default: "Lawyer" },
    status: { type: String, enum: ["Inactive", "Active"], default: "Inactive" },
    workExperience: { type: String },
    education: { type: String },
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Lawyer", lawyerSchema);

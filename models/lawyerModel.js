const mongoose = require("mongoose");

const lawyerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // firstName: { type: String },
    // lastName: { type: String },
    // email: { type: String, unique: "That email is already taken", required: true },
    password: { type: String, required: true },
    token: { type: String },

    bio: { type: String },
    // role :{ type: String, enum: ["User", "Lawyer"], required: true,  default: "Lawyer" },
    status: { type: String, enum: ["Inactive", "Active"], default: "Inactive" },

    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Lawyer", lawyerSchema);

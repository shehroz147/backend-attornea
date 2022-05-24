const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    time: { type: String },
    date: { type: String },
    userName: { type: String },
    charges: { type: Number },
    phoneNumber: { type: String },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);

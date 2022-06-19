const mongoose = require("mongoose");


const hireSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer' },
    province: { type: String, required: true },
    city: { type: String, required: true },
    areaOfLaw: { type: String, required: true },
    purpose: { type: String },
    title: { type: String, required: true },
    budget: { type: String, required: true },
    hireType: { type: String, required: true },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Hire", hireSchema);

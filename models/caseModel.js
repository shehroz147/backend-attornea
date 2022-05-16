const mongoose = require("mongoose");

const caseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userEmail: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    category: { type: String },
    stage: { type: String, default: 'Open' },
    nextHiring: { type: Date },
    previousHiring: { type: Date },
    notes: { type: String },
    courtName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Case", caseSchema);

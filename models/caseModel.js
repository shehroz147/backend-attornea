const mongoose = require("mongoose");

const caseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    category: { type: String },
    stage: { type: String, default: 'Open' },
    nextHiring: { type: String },
    previousHiring: { type: String },
    startingDate: { type: String },
    history: { type: Array },
    notes: { type: String },
    courtName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Case", caseSchema);

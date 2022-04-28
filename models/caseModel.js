const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    // caseClient: request.caseClient,
    // name: request.name,
    category: { type: String },
    // caseNumber: request.caseNumber,
    stage: { type: String },
    nextHiring: { type: String },
    previousHiring: { type: String },
    notes: { type: String },
    courtName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Case", caseSchema);

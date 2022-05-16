const mongoose = require("mongoose");

const citationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    clcName: { type: String },
    code: { type: String },
    tags: { type: String },
    // caseNumber: request.caseNumber,
    headNotes: { type: String },
    caseDescription: { type: String },
    year: { type: String },
    courtName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Citation", citationSchema);

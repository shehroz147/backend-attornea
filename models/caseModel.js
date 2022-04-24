const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    caseStatus: { type: String },
    caseClient: { type: String },
    caseName: { type: String },
    caseNumber: { type: String },
    caseData: { type: String },
    caseRemarks: { type: String },
    caseTypes: { type: String },
    caseFees: { type: String },
    caseCharges: { type: String },
    casePatitioner: { type: String },
    caseRespondor: { type: String },
    caseDescription: { type: String },
    opponentName: { type: String },
    opponentLawyer: { type: String },
    opponentNumber: { type: String },
    courtName: { type: String },
    courtCity: { type: String },
    judgeName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Case", caseSchema);

const mongoose = require("mongoose");

// Models
const Lawyer = require("../models/lawyerModel");
const Case = require('../models/caseModel');


exports.findLawyer = async (email) => {
    return await Lawyer.find({ email: email });
}

exports.findLawyerPass = async (email, pass) => {
    return await Lawyer.find({ email: email, password: pass });
}


exports.addCase = async (request) => {
    const myCase = new Case({
        _id: new mongoose.Types.ObjectId(),
        caseStatus: request.caseStatus,
        caseClient: request.caseClient,
        caseName: request.caseClient,
        caseNumber: request.caseNumber,
        caseData: request.caseData,
        caseRemarks: request.caseRemarks,
        caseType: request.caseType,
        caseFee: request.caseFee,
        caseCharges: request.caseCharges,
        casePatitioner: request.casePatitioner,
        caseRespondor: request.caseRespondor,
        caseDescription: request.caseDescription,
        opponentName: request.opponentName,
        opponentLawyer: request.opponentLawyer,
        opponentNumber: request.opponentNumber,
        courtName: request.courtName,
        courtCity: request.courtCity,
        judgeName: request.judgeName
    })
    return await myCase.save();

}
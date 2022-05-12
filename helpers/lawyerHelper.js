const mongoose = require("mongoose");

// Models
const Lawyer = require("../models/lawyerModel");
const Case = require('../models/caseModel');


exports.findLawyer = async (email) => {
    return await User.find({ email: email, role: "Lawyer" });
}

exports.findLawyerPass = async (email, pass) => {
    return await User.find({ email: email, password: pass, role: "Lawyer" });
}


exports.addCase = async (request) => {
    console.log(request);
    const myCase = new Case({
        _id: new mongoose.Types.ObjectId(),
        title: request.title,
        // caseClient: request.caseClient,
        // name: request.name,
        category: request.category,
        // caseNumber: request.caseNumber,
        stage: request.stage,
        nextHiring: request.nextHiring,
        previousHiring: request.previousHiring,
        notes: request.notes,
        courtName: request.courtName,
    })
    return await myCase.save();

}
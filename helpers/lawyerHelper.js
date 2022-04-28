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
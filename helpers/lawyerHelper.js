const mongoose = require("mongoose");

// Models
const Lawyer = require("../models");



exports.findLawyer = async (email) => {
    return await Lawyer.find({ email: email });
}

exports.findLawyerPass = async (email, pass) => {
    return await Lawyer.find({ email: email, password: pass });
}

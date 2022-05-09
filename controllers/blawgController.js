const Blawgs = require("../models/blawgModel");
const mongoose = require("mongoose");

exports.addBlawgs = async (req, res) => {
    let request = req.body;
    let title = request.title;
    let category = request.category;
    let description = request.description;
    const blawg = new Blawgs({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        category: category,
        description: description
    })
    await blawg.save();
    return res.status(200).json("successfull");
}


exports.viewBlawgs = async (req, res) => {
    // let request = req.body;
    let blawgsList = [];
    blawgsList = await Blawgs.find();
    return res.status(200).json(blawgsList);
}
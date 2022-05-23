const Blawgs = require("../models/blawgModel");
const mongoose = require("mongoose");

exports.addBlawgs = async (req, res) => {
    let request = req.body;
    console.log(request);
    // console.log(request.description._immutable.currentContent);
    // console.log(request.description._immutable.decorator);
    let title = request.title;
    let category = request.category;
    let description = request.description;
    let imageUrl = request.imageUrl;
    const blawg = new Blawgs({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        category: category,
        description: description,
        imageUrl: imageUrl
    })
    await blawg.save();
    return res.status(200).json("successfull");
}


exports.viewAllBlawgs = async (req, res) => {
    // let request = req.body;
    let blawgsList = [];
    blawgsList = await Blawgs.find({ category: req.body.category }).sort({ createdAt: -1 });;
    return res.status(200).json(blawgsList)
}

exports.viewBlawgs = async (req, res) => {
    // let request = req.body;
    let blawgsList = [];
    blawgsList = await Blawgs.find().limit(4).sort({ createdAt: -1 });
    return res.status(200).json(blawgsList);
}
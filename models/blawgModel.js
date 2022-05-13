const mongoose = require("mongoose");

const blawgSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    category: { type: String },
    description: { type: String },
    imageUrl: { type: String }

}, { timestamps: true });

module.exports = mongoose.model("Blawg", blawgSchema);

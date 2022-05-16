const mongoose = require("mongoose");


const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    province: { type: String },
    city: { type: String },
    areaOfLaw: { type: String },
    comments: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String }
    },
    title: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true }, { strict: false });

module.exports = mongoose.model("Question", questionSchema);

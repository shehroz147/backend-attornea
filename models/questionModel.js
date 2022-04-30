const mongoose = require("mongoose");


const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userEmail: { type: String },
    province: { type: String },
    city: { type: String },
    areaOfLaw: { type: String },
    title: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);

const mongoose = require("mongoose");

const diarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cases: [
        mongoose.Schema({
            case: { type: String },
        }, { strict: false })
    ],
}, { timestamps: true }, { strict: false });

module.exports = mongoose.model("Diary", diarySchema);

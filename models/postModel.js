const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: String },
    userName: { type: String },
    comments: [
        new mongoose.Schema({
            user: { type: String },
            desc: { type: String },
        }, { strict: false })
    ],
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true }, { strict: false });

module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String },
    userName: { type: String },
    comments: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String }
    },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true }, { strict: false });

module.exports = mongoose.model("Post", postSchema);

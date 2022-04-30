const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: String },
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);

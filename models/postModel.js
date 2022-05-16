const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: String },
    image: { type: String },
    userName: { type: String },
    comments: [
        mongoose.Schema({
            user: { type: String },
        }, { strict: false })
    ],
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true }, { strict: false });

module.exports = mongoose.model("Post", postSchema);

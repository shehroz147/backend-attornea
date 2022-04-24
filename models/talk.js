const mongoose = require("mongoose");


const talkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    province:{type:String},
    city:{type:String,required:true},
    areaOfLaw:{type:String,required:true},
    lawyerId:{type:mongoose.Schema.Types.ObjectId, ref:'Lawyer'},
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Talk",talkSchema )
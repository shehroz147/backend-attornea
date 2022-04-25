const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pName:{type:String,required:true},
    pPrice:{type:Number,required:true},
    sellerName:{type:String,required:true},
    lawyerId:{type:mongoose.Schema.Types.ObjectId, ref:'Lawyer'},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    quantity:{type:String,required:true},
    isDeleted: { type: Boolean, default: "false" },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

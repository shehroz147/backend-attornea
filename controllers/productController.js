
const Product = require("../models/product");
const mongoose = require('mongoose');
// const UserHelper = require('../helpers/userHelper');
// const Token = require('../models/tokenModel');
// const EmailHelper = require('../utils/emailHelper');
// const Question = require('../models/questionModel');
// const jwt = require("jsonwebtoken");
// const Talk = require('../models/talk')
// const hireLawyer = require("../models/hireLawyer");
// const Lawyer = require('../models/lawyerModel');


exports.createProduct = async (req, res) => {
    let request = req.body;
    // console.log(request);
    let name = request.name;
    let sellerName = request.sellerName;
    let quantity = request.quantity;
    let price = request.price;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        sellerName: sellerName,
        quantity: quantity,
        price: price
    });
    await product.save();
    return res.status(200).json("Successful");
};


exports.viewProducts = async (req, res) => {

    const products = await Product.find().limit(3);
    return res.status(200).json(products);

}
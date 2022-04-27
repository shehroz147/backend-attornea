const User = require("../models/userModel");
const mongoose = require('mongoose');
const UserHelper = require('../helpers/userHelper');
const Token = require('../models/tokenModel');
const EmailHelper = require('../utils/emailHelper');
const Question = require('../models/questionModel');
const jwt = require("jsonwebtoken");
const Talk = require('../models/talk')
const hireLawyer = require("../models/hireLawyer");
const Lawyer = require('../models/lawyerModel');


exports.registerUser = async (req, res) => {
    let request = req.body;
    console.log(request);
    let email = request.email;
    let password = request.password;
    let firstName = request.firstName;
    let lastName = request.lastName;

    let credentialsCheck = await this.checkCredentials(firstName, lastName, email.toLowerCase(), password);
    if (!credentialsCheck) {
        return res.status(400).json("Missing required information")
    }

    let checkEmail = await UserHelper.findUser(email.toLowerCase());
    // console.log(checkEmail);
    if (!(checkEmail.length === 0)) {
        return res.status(400).json("Email already exists");
    }
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email.toLowerCase(),
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    await user.save();
    const data = await this.tokenCreater(email);
    let token = await new Token({
        userId: user._id,
        token: data,
    }).save();

    const message = `https://attor-back.herokuapp.com/user/verify/${user._id}/${token.token}`;
    await EmailHelper.sendEmail(user.email, message);
    return res.status(200).json("Successful");
};


exports.checkCredentials = async (firstName, lastName, email, password) => {
    if (!firstName || !lastName || !email || !password) {
        return false;
    }
    return true;
}



exports.tokenCreater = async (email) => {
    return jwt.sign({
        iss: 'Attornea',
        sub: email,
        iat: new Date().getTime(), // current time
        exp: Math.floor(Date.now() / 1000) + (60 * 60)// 60 minutes
    }, process.env.JWT_SECRET || 'Attornea123$');
}


exports.decodeToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return err;
    }
}


exports.verifyEmail = async (req, res) => {

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne({ _id: user._id }, { isVerified: true });
    await Token.findByIdAndRemove(token._id);

    res.status(200).json("email verified sucessfully");


}


exports.login = async (req, res) => {

    let request = req.body;
    // console.log(request);
    // console.log(request);
    let email = request.email;
    let password = request.password;

    if (!email || !password) {
        return res.status(400).json("Missing required information")
    }

    let checkEmail = await UserHelper.findUser(email);
    // console.log(checkEmail);
    if (checkEmail === null) {
        return res.status(400).json("Email doesnot exists");
    }
    let checkPassword = await UserHelper.findUser(email, password);
    if (checkPassword === null) {
        return res.status(400).json("Invalid password");
    }

    return res.status(200).json("Successful");
};
//checked
exports.askQuestion = async (req, res) => {

    let userId = req.body.userId
    const findUser = await User.find({ _id: userId })
    console.log(findUser)
    if (!findUser) {
        return res.status(400).json("User doesnot Exists")
    }
    let province = req.body.province
    let city = req.body.city
    let title = req.body.title
    let areaOfLaw = req.body.areaOfLaw
    let description = req.body.description

    const ques = new Question({
        _id: new mongoose.Types.ObjectId(),
        city: city,
        title: title,
        province: province,
        areaOfLaw: areaOfLaw,
        description: description,
        userId: userId
    })
    await ques.save()
    return res.status(200).json("Question Posted")
}

exports.hire = async (req, res) => {
    let userId = req.body.userId
    const findUser = await User.find({ _id: userId })
    console.log(findUser)
    if (findUser.length === 0) {
        return res.status(400).json("User doesnot Exists")
    }

    let province = req.body.province
    let city = req.body.city
    let title = req.body.title
    let areaOfLaw = req.body.areaOfLaw
    let purpose = req.body.purpose
    let budget = req.body.budget
    let hireType = req.body.hireType
    if (!(province && purpose && budget)) {
        return res.status(400).json("Something Missing")
    }

    const hiree = new hireLawyer({
        _id: new mongoose.Types.ObjectId(),
        purpose: purpose,
        budget: budget,
        hireType: hireType,
        areaOfLaw: areaOfLaw,
        city: city,
        province: province,
        title: title,
        userId: userId
    })
    await hiree.save()
    return res.status(200).json("Done---")
}

exports.talk = async (req, res) => {
    let userId = req.body.userId
    const findUser = await User.find({ _id: userId })
    console.log(findUser)
    if (findUser.length === 0) {
        return res.status(400).json("User doesnot Exists")
    }
    let province = req.body.province
    let city = req.body.city
    let areaOfLaw = req.body.areaOfLaw
    if (!(city && areaOfLaw)) {
        return res.status(400).json("Feilds Missing")
    }
    const talkk = new Talk({
        _id: new mongoose.Types.ObjectId(),
        province: province,
        city: city,
        areaOfLaw: areaOfLaw,
        userId: userId
    })
    await talkk.save();
    return res.status(200).json("done--")
}


exports.viewRecentQuestions = async (req, res) => {
    let request = req.body;
    let queries = [];
    queries = await Question.find()
    return res.status(200).json(queries);
}

exports.viewLawyers = async (req, res) => {
    let request = req.body;
    let lawyerList = [];
    lawyerList = await User.find();
    return res.status(200).json(lawyerList);
}

exports.getUserData = async (req, res) => {
    let request = req.body;
    let email = request.email;
    console.log(request);
    const findUser = await User.find({ email: email });
    console.log(findUser)
    if (findUser === null) {
        return res.status(400).json("User with thhis email doesnot exist")
    }
    else {
        return res.status(200).json(findUser);
    }
}

exports.viewqueries = async (req, res) => {

    const question = await Question.find();
    return res.status(200).json(question);

}
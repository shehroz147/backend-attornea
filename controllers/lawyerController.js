const mongoose = require('mongoose');
const UserHelper = require('../helpers/userHelper');
const Token = require('../models/tokenModel');
const EmailHelper = require('../utils/emailHelper');
const Question = require('../models/question')
const Lawyer = require('../models/lawyerModel')
const HireLawyer = require('../models/hireLawyer')
const LawyerHelper = require('../helpers/lawyerHelper')

const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require('express/lib/response');


exports.addCase = async () => {
    let request = req.body;
    const addingCase = await LawyerHelper.addCase(request);
    return res.status(200).json("Successfully added case");

}
// exports.registerUser = async (req, res) => {
//     let request = req.body;
//     console.log(request);
//     let email = request.email;
//     let password = request.password;
//     let firstName = request.firstName;
//     let lastName = request.lastName;

//     let credentialsCheck = await this.checkCredentials(firstName, lastName, email.toLowerCase(), password);
//     if (!credentialsCheck) {
//         return res.status(400).json("Missing required information")
//     }

//     let checkEmail = await LawyerHelper.findUser(email.toLowerCase());
//     // console.log(checkEmail);
//     if (!(checkEmail.length === 0)) {
//         return res.status(400).json("Email already exists");
//     }
//     const lawyer = new Lawyer({
//         _id: new mongoose.Types.ObjectId(),
//         email: email.toLowerCase(),
//         password: password,
//         firstName: firstName,
//         lastName: lastName
//     });
//     await lawyer.save();
//     const data = await this.tokenCreater(email);
//     let token = await new Token({
//      lawyerId: lawyer._id,
//         token: data,
//     }).save();

//     const message = `http://localhost:4000/user/verify/${user._id}/${token.token}`;
//     await EmailHelper.sendEmail(user.email, message);
//     return res.status(200).json("Successful");
// };


// exports.checkCredentials = async (firstName, lastName, email, password) => {
//     if (!firstName || !lastName || !email || !password) {
//         return false;
//     }
//     return true;
// }



// exports.tokenCreater = async (email) => {
//     return jwt.sign({
//         iss: 'Pera',
//         sub: email,
//         iat: new Date().getTime(), // current time
//         exp: Math.floor(Date.now() / 1000) + (60 * 60)// 60 minutes
//     }, process.env.JWT_SECRET);
// }


// exports.decodeToken = async (token) => {
//     try {
//         return jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//         return err;
//     }
// }


// exports.verifyEmail = async (req, res) => {

//     const user = await User.findOne({ _id: req.params.id });
//     if (!user) return res.status(400).send("Invalid link");

//     const token = await Token.findOne({
//         userId: user._id,
//         token: req.params.token,
//     });
//     if (!token) return res.status(400).send("Invalid link");

//     await Lawyer.updateOne({ _id: lawyer._id, isVerified: true });
//     await Token.findByIdAndRemove(token._id);

//     res.send("email verified sucessfully");


// }


// exports.login = async (req, res) => {

//     let request = req.body;
//     // console.log(request);
//     // console.log(request);
//     let email = request.email;
//     let password = request.password;

//     if (!email || !password) {
//         return res.status(400).json("Missing required information")
//     }

//     let checkEmail = await UserHelper.findUser(email);
//     console.log(checkEmail);
//     if (checkEmail === null) {
//         return res.status(400).json("Email doesnot exists");
//     }
//     let checkPassword = await UserHelper.findUser(email, password);
//     if (checkPassword === null) {
//         return res.status(400).json("Invalid password");
//     }

//     return res.status(200).json("Successful");

// };



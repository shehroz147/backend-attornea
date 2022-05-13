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
const Post = require("../models/postModel");
const { findLawyer } = require("../helpers/lawyerHelper");
const Citation = require("../models/citationModel");
exports.registerUser = async (req, res) => {
    let request = req.body;
    console.log(request);
    let email = request.email;
    let password = request.password;
    let firstName = request.firstName;
    let lastName = request.lastName;
    let country = request.country;

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
        lastName: lastName,
        country: request.country,
        role: request.role
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

exports.showPostComment = async (req, res) => {
    let postId = req.body.postId;
    // console.log(req.body);
    let comments = await Post.find({ _id: postId }, { comments: 1 });
    console.log(comments);
    return res.status(200).json(comments);
}

exports.getCitation = async (req, res) => {
    const getCitation = await Citation.find();
    return res.status("200").json(getCitation);
}

exports.deleteQuestion = async (req, res) => {
    const id = req.body.id;
    console.log(req.body.id);
    let edit = {
        isDeleted: true,
    }
    // await User.updateOne({ _id: id }, { $set: updateInfo }).exec();
    await Question.updateOne({ _id: id }, { $set: edit }).exec();
    return res.status(200).json("success")

}


// exports.getLawyerData = async (req, res) => {
//     let request = req.body;
//     console.log(request);
//     let email = request.email;
//     const findLawyer = await User.find({ email: email, role: "Lawyer" });
//     return res.status(200).json(findLawyer);

// }

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
    let email = request.email;
    let password = request.password;
    let checkEmail = await UserHelper.findUser(email, password);
    // console.log(checkEmail);
    if ((checkEmail.length === 0)) {
        return res.status(400).json("Failed");
    }
    console.log(checkEmail);
    return res.status(200).json(checkEmail);
};
//checked
exports.askQuestion = async (req, res) => {

    let province = req.body.province
    let city = req.body.city
    let title = req.body.title
    let areaOfLaw = req.body.areaOfLaw
    let description = req.body.description
    let email = req.body.email;
    // const findUser = await User.find({ email: email });
    const ques = new Question({
        _id: new mongoose.Types.ObjectId(),
        city: city,
        title: title,
        province: province,
        areaOfLaw: areaOfLaw,
        description: description,
        userEmail: email
    })
    await ques.save();
    // await Question.find({ _id: ques._id }).populate("userId");
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
    lawyerList = await User.find({ role: "Lawyer" }).limit(6).sort({ createdAt: -1 });
    return res.status(200).json(lawyerList);
}

exports.getUserData = async (req, res) => {
    let request = req.body;
    console.log(req.body.email);
    let email = request.email;
    // console.log(request);
    let findUser = await User.find({ email: email, role: "User" });
    // console.log(findUser[0])
    if (findUser === null) {
        return res.status(400).json("User with thhis email doesnot exist")
    }
    else {
        return res.status(200).json(findUser[0]);
    }
}


exports.getLawyerData = async (req, res) => {
    let request = req.body;
    console.log(req.body.email);
    let email = request.email;
    // console.log(request);
    let findUser = await User.find({ email: email, role: "Lawyer" });
    console.log(findUser[0])
    if (findUser === null) {
        return res.status(400).json("User with thhis email doesnot exist")
    }
    else {
        return res.status(200).json(findUser[0]);
    }
}

exports.viewqueries = async (req, res) => {

    const question = await Question.find({ isDeleted: false }).limit(6).sort({ createdAt: -1 });
    console.log(question);
    return res.status(200).json(question);
}


exports.showAllQuestion = async (req, res) => {

    const question = await Question.find({ isDeleted: false }).sort({ createdAt: -1 });
    console.log(question);
    return res.status(200).json(question);

}


exports.updateUser = async (req, res) => {
    let request = req.body;
    let email = req.body.email;
    const findUser = await User.find({ email: email, role: "User" });
    const updateInfo = {
        firstName: req.body.firstName || findUser.firstName,
        gender: req.body.gender || findUser.gender,
        bio: req.body.bio || findUser.description,
        profileImage: req.body.imageUrl || findUser.profileImage
    }
    await User.updateOne({ email: request.email }, { $set: updateInfo })
        .exec()
        .then(docs => {
            result = docs;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return res.status(200).json("successfull");
}


exports.updateLawyer = async (req, res) => {
    let request = req.body;
    let email = req.body.email;
    const findUser = await User.find({ email: email, role: "Lawyer" });
    const updateInfo = {
        firstName: req.body.name || findUser.firstName,
        gender: req.body.gender || findUser.gender,
        bio: req.body.bio || findUser.description,
        profileImage: req.body.imageUrl || findUser.profileImage,
        licenseNo: req.body.License || findUser.licenseNo,
        education: req.body.education || findUser.education,
        workExperience: req.body.workExperience || findUser.workExperience,
        practiceArea: req.body.practiceArea || findLawyer.practiceArea
    }
    await User.updateOne({ email: request.email }, { $set: updateInfo })
        .exec()
        .then(docs => {
            result = docs;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return res.status(200).json("successfull");
}

exports.showMyQuestions = async (req, res) => {

    const question = await Question.find({ userEmail: req.body.email, isDeleted: false }).sort({ createdAt: -1 });
    return res.status(200).json(question);

}

exports.showAllUsers = async (req, res) => {

    let users = await User.find().sort({ createdAt: -1 });
    // let lawyers = await Lawyer.find().sort({ createdAt: -1 });
    // Array.prototype.push.apply(users, lawyers);
    return res.status(200).json(users);

}

exports.showPosts = async (req, res) => {

    // let users = await User.find().sort({ createdAt: -1 });
    let posts = await Post.find().sort({ createdAt: -1 });
    // Array.prototype.push.apply(users, lawyers);
    // console.lo
    console.log(posts);
    return res.status(200).json(posts);

}


exports.addPost = async (req, res) => {

    let data = req.body.data;
    const userName = req.body.userName;
    const user = await User.find({ email: userName, isVerified: true });
    console.log(user[0].firstName);
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        data: data,
        userName: user[0].firstName
    });
    await post.save();
    return res.status(200).json("success");
    // const post = await Question.find().limit(6).sort({ createdAt: -1 });
    // console.log(question);
    // return res.status(200).json(question);

}


exports.commentOnPost = async (req, res) => {
    // console.log(req.body);
    let postId = req.body.postId;
    let userId = req.body.userId;
    let desc = req.body.desc;
    let user = await User.findOne({ email: userId }, { comments: 0, _id: 0 });
    // console.log(user);
    // user.toString();
    let post = await Post.findOne({ _id: postId });
    // console.log(post);
    let addComment = await Post.updateOne(post, { $push: { comments: user } });
    let addDesc = await Post.findOne({ _id: post._id }, { comments: { $elemMatch: { email: user.email } } });

    console.log(addDesc);
    let done = await Post.updateOne(addDesc, { $push: { comments: { desc: desc } } });
    // $push: { participants: { teamName } }
    return res.status(200).json("Comment added")
    // exports.addFriend = async (user, friend, res) => {
    //     return User.updateOne(user, { $push: { friends: { friend } } });
    // }
}
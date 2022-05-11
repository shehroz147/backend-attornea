const mongoose = require('mongoose');
const UserHelper = require('../helpers/userHelper');
const Token = require('../models/tokenModel');
const EmailHelper = require('../utils/emailHelper');
const Question = require('../models/questionModel')
const Lawyer = require('../models/lawyerModel')
const HireLawyer = require('../models/hireLawyer')
const Product = require('../models/product')
const LawyerHelper = require('../helpers/lawyerHelper')
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require('express/lib/response');
const Case = require("../models/caseModel");
const Citation = require("../models/citationModel");

exports.addCase = async (req, res) => {
    let request = req.body;
    const addingCase = await LawyerHelper.addCase(request);
    return res.status(200).json("Successfully added case");

}
exports.editCase = async (req, res) => {
    let id = req.body.id;
    console.log(req.body)
    const findCase = await Case.find({ _id: id })
    const update = {
        title: req.body.title || findCase.title,
        courtName: req.body.courtName || findCase.courtName,
        notes: req.body.notes || findCase.notes,
        nextHiring: req.body.nextHiring || findCase.nextHiring,
        previousHiring: req.body.previousHiring || findCase.previousHiring,
        category: req.body.category || findCase.category,
        stage: req.body.stage || findCase.stage,
        // praticeArea: req.body.praticeArea || findLawyer.praticeArea
    }
    await Case.updateOne({ _id: id }, { $set: update })
        .exec()
        .then(docs => {
            result = docs;
        })
        .catch(err => {
            return err;
        });
    return res.status(200).json("Case Info Updated")
}

exports.addComment = async (req, res) => {
    let request = req.body;
    console.log(request);
    let questionId = request._id;
    const userEmail = req.body.userEmail;
    const user = await Lawyer.find({ email: userEmail });
    // let findQuestion = await Question.find({ _id: questionId });
    const comment = {
        user: user.firstName,
        details: request.description
    };
    let addComment = await Question.updateOne({ _id: questionId }, { $set: { comments: comment } }).exec();
    return res.status(200).json("successfull");
    // return User.updateOne(user, { $push: { friends: { friend } } });
    // let user = await UserHelper.findUserByUserName(request.userName);
    // if (user == null) {
    //     this.noSuchUserResponse(req, res);
    // } else {
    //     let findRequest = await UserHelper.findRequest(user._id);
    //     if (findRequest == null) {
    //         this.noSuchRequestResponse(req, res);
    //     } else {
    //         let myId = await UserHelper.foundUserByEmail(request.email);
    //         let checkFriend = await UserHelper.findFriend(user.userName, myId);
    //         let result = await UserHelper.acceptRequest(findRequest);
    //         let addAsFriend = await UserHelper.addFriend(myId, user, res);
    //         this.requestSuccessfulResponse(req, res, addAsFriend);
    //     }
    // }
}

exports.getLawyerData = async (req, res) => {
    let request = req.body;
    console.log(req.body.email);
    let email = request.email;
    // console.log(request);
    let findUser = await Lawyer.find({ email: email });
    // console.log(findUser[0])
    if (findUser === null) {
        return res.status(400).json("User with thhis email doesnot exist")
    }
    else {
        return res.status(200).json(findUser[0]);
    }
}
exports.citationSearch = async (req, res) => {
    let request = req.body;
    // console.log(request);
    let clcName = request.clcName;
    let title = request.title;
    let code = request.code;
    let tags = request.tags;
    let headNotes = request.headNotes;
    let caseDescription = request.caseDescription;
    let year = request.year;
    let courtName = request.courtName;

    const citation = new Citation({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        clcName: clcName,
        code: code,
        tags: tags,
        headNotes: headNotes,
        caseDescription: caseDescription,
        year: year,
        courtName: courtName
    });
    await citation.save();
    return res.status(200).json("Successful");
};


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

exports.addProduct = async (req, res) => {
    let lawyerId = req.body.lawyerId
    const findLawyer = await Lawyer.find({ lawyerId: lawyerId })
    if (!findLawyer) {
        return res.status(400).json("No User Found")
    }
    let pName = req.body.pName
    let pPrice = req.body.pPrice
    let sellerName = req.body.sellerName
    let quantity = req.body.quantity
    if (!(pPrice && quantity && pName)) {
        return res.status(200).json("something missing")
    }
    const addP = new Product({
        _id: new mongoose.Types.ObjectId(),
        quantity: quantity,
        pName: pName,
        pPrice: pPrice,
        sellerName: sellerName,
        lawyerId: lawyerId
    })
    await addP.save()
    return res.status(200).json("SucessFully Added")
}

exports.getUserbyId = async (req, res) => {
    let userId = req.body.userId
    const findUser = await User.find({ _id: userId })
    if (findUser.length === 0) {
        return res.status(400).json("User does not exist")
    }
    return res.status(200).json(findUser);
}

exports.viewAllProducts = async (req, res) => {
    let request = req.body;
    let products = [];
    products = await Product.find()
    return res.status(200).json(products);
}

exports.editProduct = async (req, res) => {
    let lawyerId = req.body.lawyerId
    const findLawyer = await Lawyer.find({ _id: lawyerId })
    if (!findLawyer) {
        return res.status(400).json("User doesnot exists")
    }
    const edit = {
        quantity: req.body.quantity || findLawyer.quantity,
        pName: req.body.pName || findLawyer.pName,
        pPrice: req.body.pName || findLawyer.pPrice,
        sellerName: req.body.sellerName || findLawyer.sellerName
    }
    await Product.updateOne({ _id: lawyerId }, { $set: { edit } })
    return res.status(200).json("Updated")
};

//Not Checked//
exports.deleteProduct = async (req, res) => {
    let lawyerId = req.body.lawyerId
    const findLawyer = await Lawyer.find();
    if (!findLawyer) {
        return res.status(404).json("Lawyer Doesnot Exists")
    }
    const del = {
        isDeleted: true
    }
    await Product.updateOne({ _id: lawyerId }, { $set: { del } })
    return res.status(200).json("Product Deleted")
}


exports.updateProfile = async (req, res) => {
    let result;
    // let lawyerId = req.body._id
    const findLawyer = await Lawyer.find({ email: req.body.email })
    if (findLawyer.length === 0) {
        return res.status(400).json("Lawyer Doesnot exists")
    }
    const update = {
        firstName: req.body.firstName || findLawyer.firstName,
        email: req.body.email || findLawyer.email,
        gender: req.body.gender || findLawyer.gender,
        lisenseNo: req.body.lisenseNo || findLawyer.lisenseNo,
        bio: req.body.bio || findLawyer.bio,
        workExperience: req.body.workExperience || findLawyer.workExperience,
        education: req.body.education || findLawyer.education,
        praticeArea: req.body.praticeArea || findLawyer.praticeArea
    }
    await Lawyer.updateOne({ email: req.body.email }, { $set: update })
        .exec()
        .then(docs => {
            result = docs;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return res.status(200).json("Lawyer Info Updated")
}


exports.removeLawyer = async (req, res) => {
    let lawyerId = req.body.lawyerId
    const findLawyer = await Lawyer.find({ _id: req.body._id })
    if (!findLawyer) {
        return res.status(404).json("No Lawyer Found")
    }
    let updateInfo = {
        isDeleted: true,
        // deletedAt 	: moment()
    }

    // for(let i=0;i<ids.length;i++){
    await User.updateOne({ _id: req.body._id }, { $set: updateInfo }).exec()
        .then(docs => {
            result = docs;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });;
    // }
    return res.status(200).json("Lawyer Deleted")
}


exports.getCases = async (req, res) => {
    const cases = await Case.find();
    return res.status(200).json(cases);
}


exports.registerLawyer = async (req, res) => {
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
    const user = new Lawyer({
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

    const user = await Lawyer.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await Lawyer.updateOne({ _id: user._id }, { isVerified: true });
    await Token.findByIdAndRemove(token._id);

    res.status(200).json("email verified sucessfully");

}

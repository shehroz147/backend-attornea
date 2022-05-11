// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const UserController = require('../controllers/userController');


// Routes
router.post("/register", UserController.registerUser);
router.get("/verify/:id/:token", UserController.verifyEmail);
router.post("/login", UserController.login);
router.post("/postQuestion", UserController.askQuestion)
router.post("/hire", UserController.hire)
router.post('/talk', UserController.talk)
router.post('/viewLawyers', UserController.viewLawyers);
router.post('/userData', UserController.getUserData);
router.post('/viewqueries', UserController.viewqueries);
router.post("/showMyQuestions", UserController.showMyQuestions);
// router.post('/addQuestion',UserController.askQuestion)
router.post("/setProfile", UserController.updateUser);
router.post("/addPost", UserController.addPost);
router.post("/getLawyerInfo", UserController.getLawyerData);
router.post("/deleteQuestion", UserController.deleteQuestion);
router.post("/getCitation", UserController.getCitation);
router.post("/showPosts", UserController.showPosts);

module.exports = router;

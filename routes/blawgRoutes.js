// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const BlawgController = require('../controllers/blawgController');


// Routes
router.post("/addBlawg", BlawgController.addBlawgs);
// router.get("/verify/:id/:token", UserController.verifyEmail);
// router.post("/login", UserController.login);
// router.post("/postQuestion", UserController.askQuestion)
// router.post("/hire", UserController.hire)
// router.post('/talk', UserController.talk)]
// router.post('/getCases', LawyerController.getCases)
// router.post('/addProduct', LawyerController.addProduct)
// router.post('/getuserbyID', LawyerController.getUserbyId)
router.post('/viewBlawgs', BlawgController.viewBlawgs);
// router.post('/editProducts', LawyerController.editProduct)
// router.post('/updateProfile', LawyerController.updateProfile)
// router.post('/removeLawyer', LawyerController.removeLawyer)

module.exports = router;

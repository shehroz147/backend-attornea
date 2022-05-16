// Express Router
const express = require("express");
const { route } = require("../app");
const router = express.Router();

// Controllers
const LawyerController = require('../controllers/lawyerController');


// Routes
router.post("/addCase", LawyerController.addCase);
router.post("/editCase", LawyerController.editCase);
router.post("/register", LawyerController.registerLawyer);
router.get("/verify/:id/:token", LawyerController.verifyEmail);
// router.get("/verify/:id/:token", UserController.verifyEmail);
// router.post("/login", UserController.login);
// router.post("/postQuestion", UserController.askQuestion)
// router.post("/hire", UserController.hire)
// router.post('/talk', UserController.talk)]
router.post('/getCases', LawyerController.getCases)
router.post('/getCasesForToday', LawyerController.getCasesForToday)
router.post('/addProduct', LawyerController.addProduct)
router.post('/getuserbyID', LawyerController.getUserbyId)
router.post('/viewAllProducts', LawyerController.viewAllProducts)
router.post('/editProducts', LawyerController.editProduct)
router.post('/updateProfile', LawyerController.updateProfile)
router.post('/removeLawyer', LawyerController.removeLawyer)
router.post('/setProfile', LawyerController.updateProfile);
router.post("/lawyerData", LawyerController.getLawyerData);
router.post("/citationSearch", LawyerController.citationSearch);
router.post("/addComment", LawyerController.addComment);
module.exports = router;

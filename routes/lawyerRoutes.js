// Express Router
const express = require("express");
const { route } = require("../app");
const router = express.Router();

// Controllers
const LawyerController = require('../controllers/lawyerController');


// Routes
router.post("/addCase", LawyerController.addCase);
// router.get("/verify/:id/:token", UserController.verifyEmail);
// router.post("/login", UserController.login);
// router.post("/postQuestion", UserController.askQuestion)
// router.post("/hire", UserController.hire)
// router.post('/talk', UserController.talk)]
router.post('/addProduct',LawyerController.addProduct)
router.post('/getuserbyID',LawyerController.getUserbyId)
router.post('/viewAllProducts',LawyerController.viewAllProducts)
router.post('/editProducts',LawyerController.editProduct)

module.exports = router;

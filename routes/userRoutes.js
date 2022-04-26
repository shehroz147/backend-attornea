// Express Router
const express = require("express");
const { route } = require("../app");
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
router.post('/viewqueries',UserController.viewqueries);  

module.exports = router;

// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const UserController = require('../controllers/userController');


// Routes

router.post("/showAllUsers", UserController.showAllUsers);
module.exports = router;

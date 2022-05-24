// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const UserController = require('../controllers/userController');


// Routes

router.post("/showAllUsers", UserController.showAllUsers);
router.post("/login", UserController.login);
router.post("/deleteUser", UserController.deleteUser);
router.post("/showAllBookings", UserController.showBookings);
router.post("/editBooking", UserController.editBooking);
router.post("/showEarnings", UserController.showEarnings);
module.exports = router;

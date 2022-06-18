// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const AppoinmentController = require('../controllers/appointmentController');


router.get('/', AppoinmentController.videoCall);
// router.get('/:room', AppoinmentController.startCall);
// Routes

module.exports = router;

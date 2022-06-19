// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const AppoinmentController = require('../controllers/appointmentController');


router.post('/join-room', AppoinmentController.videoCall);
router.get('/', AppoinmentController.room);
// Routes

module.exports = router;

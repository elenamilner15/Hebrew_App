// server\routes\verbRoutes.js
const express = require("express")
const router = express.Router()
const verbController = require('../controllers/verbController');


// Endpoint to get a Present
router.get('/countinfinitive/:level/:category', verbController.countInfinitive);
router.get('/infinitive/:level/:category', verbController.getInfinitive);
// router.get('/infinitive', verbController.getInfinitive);
router.get('/present/:level/:part_of_speech/', verbController.getPresent);
module.exports = router;
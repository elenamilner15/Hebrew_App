// server\routes\verbRoutes.js
const express = require("express")
const router = express.Router()
const verbController = require('../controllers/verbController');


// Endpoint to get a Present
// router.get('/countinfinitive/:level/:category', verbController.countInfinitive);
// router.get('/present/:level/:part_of_speech/', verbController.getPresent);

router.get('/infinitive/:level/:category', verbController.getInfinitive);
router.get('/shuffle/:level/:category', verbController.shuffleXVerbs);



module.exports = router;
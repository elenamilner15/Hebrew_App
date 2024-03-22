// server\routes\verbRoutes.js
const express = require("express")
const router = express.Router()
const verbController = require('../controllers/verbController');


// Endpoint to get a Present
// router.get('/countinfinitive/:level/:category', verbController.countInfinitive);
// router.get('/present/:level/:part_of_speech/', verbController.getPresent);

router.get('/infinitive/:level/:category', verbController.getInfinitive);
router.get('/total_infinitive/:level/', verbController.totalInfinitive);
// router.get('/shuffle/:level/:category', verbController.shuffleXVerbs);
router.get('/present1/:level/:part_of_speech', verbController.getPresent1);
router.get('/total_present1/:level/:part_of_speech', verbController.totalPresent1);
router.get('/present2/:level/:part_of_speech', verbController.getPresent2);
router.get('/total_present2/:level/:part_of_speech', verbController.totalPresent2);

// router.get('/progress/:user_id/:level/:tense', verbController.getProgressForLevel);




module.exports = router;
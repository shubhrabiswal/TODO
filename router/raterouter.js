const express = require('express');
const router = express.Router();
const ratingcontroller = require('../controller/ratingcontroller')

router.post('/addrating',ratingcontroller.addRating )

module.exports = router;
const express = require('express');
const router = express.Router();
const likecontroller = require('../controller/likecontroller')
const passport = require('passport');
require('../')

// router.post('/addcomment',passport.authenticate('jwt',{session:false}),commentcontroller.addcomment )
router.post('/addlike',likecontroller.addlikes )
// router.get('/viewcount/:id', viewcontroller.getviewsByTodoId);
// router.get('/sort', viewcontroller.todoIdSortedByView);

module.exports = router;
const express = require('express');
const router = express.Router();
const viewcontroller = require('../controller/viewcontroller')
const passport = require('passport');
require('../')

// router.post('/addcomment',passport.authenticate('jwt',{session:false}),commentcontroller.addcomment )
router.post('/addview',viewcontroller.addviews )
router.get('/viewcount/:id', viewcontroller.getviewsByTodoId);
router.get('/sort', viewcontroller.todoIdSortedByView);

module.exports = router;
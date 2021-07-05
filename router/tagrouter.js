const express = require('express');
const router = express.Router();
const tagcontroller = require('../controller/tagcontroller')
const passport = require('passport');
require('../')

// router.post('/addcomment',passport.authenticate('jwt',{session:false}),commentcontroller.addcomment )
router.post('/addtag',tagcontroller.addtag )
router.get('/getalltags', tagcontroller.getallTags);
router.get('/:id', tagcontroller.getTagbyId);
// router.get('/todo/:id', commentcontroller.getcommentByTodoId);

module.exports = router;
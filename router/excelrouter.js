const express = require('express');
const router = express.Router();
const excelcontroller = require('../controller/excelcontroller')
const passport = require('passport');
require('../')

// router.post('/addcomment',passport.authenticate('jwt',{session:false}),commentcontroller.addcomment )
router.get('/download',excelcontroller.download )



module.exports = router;
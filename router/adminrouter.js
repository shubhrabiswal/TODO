const express = require('express');
const router = express.Router();
const admincontroller = require('../controller/admincontroller')
const passport = require('passport');
require('../')
const middleware = require('../middleware/middleware')

// router.get('/', admincontroller.adminRegister);
router.post('/signup',admincontroller.adminRegister)
router.post('/login',admincontroller.adminLogin)
router.get('/getalltodo',middleware.requireLogin,admincontroller.getalltodo)
router.get('/getalluser',middleware.requireLogin,admincontroller.getalluser)
router.get('/getallTags',middleware.requireLogin,admincontroller.getallTags)
router.get('/getcommentById/:id',middleware.requireLogin,admincontroller.getcommentById)
router.get('/currentDay',middleware.requireLogin,admincontroller.currentDay)
router.get('/currentMonth',middleware.requireLogin,admincontroller.currentMonth)




module.exports = router;
const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const passport = require('passport');
require('../')
const middleware = require('../middleware/middleware')

// router.get('/', usercontroller.userRegister);
router.post('/signup',usercontroller.userRegister)
router.post('/login',usercontroller.userLogin)


module.exports = router;
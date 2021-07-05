const express = require('express')
// const mongoose = require('mongoose')
var passport = require('passport')
const db = require("../Models");
const User = db.user;
const ActiveUser = db.activeuser;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const env = require('dotenv')
env.config();
require('../passport')

/////////generate token/////////////////////
genToken = user => {
    return jwt.sign({
      iss: 'Shubhra_B',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET);
  }

let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
const currentDate = month1 + 1 + "/" + day + "/" + year; ///////to get the current date


///////////////////controller for registration of new user//////////
exports.userRegister = async function (req, res) {
    const { email, password } = req.body;
    const newUser = new db.user({ email, password, date: currentDate })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(newUser => {
            console.log(newUser)
  
            res.status(200).json({ message: "User Registered Successfully" })
  
          })
  
      })
    })
}

///////////////////controller for login user//////////
exports.userLogin = async function (req, res) {
    const { email, password } = req.body;
  
      const user = await db.user.findOne({where:{email:email}})
        console.log("email",email)
        console.log("user",user);
      if (user) {
        console.log("lll",user);
        bcrypt.compare(password, user.password, async (err, isMatch) => {
          console.log(user);
          if (err) throw err;
          if (isMatch) {
            console.log(user.id)
            const token = genToken(user)
            const active_usr =  await db.activeuser.findAndCountAll({where:{userId:user.id}});
            console.log("active usr", active_usr.count)
            if(active_usr.count == 0){
              console.log("Active user block",active_usr.count)
              const activeuser = new db.activeuser({
                      day:day,
                      month:month,
                      userId:user.id
                    })
              activeuser.save().then((active) => {
                            res.status(200).json({ token, userid: user.id })
                          })
            }else {
                   res.status(200).json({ token, userid: user.id })
                }
          }
          else {
            return res.status(403).json({ message: "Wrong Password" });
          }
        })
      }
  
}
  
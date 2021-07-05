const express = require('express')
// const mongoose = require('mongoose')
const passport = require('passport')
const env = require('dotenv')
env.config();
const db = require("../Models");
const User = db.user;
const ActiveUser = db.activeuser;
const Admin = db.admin;
const Like =db.like;
const Todo = db.todo;
const Rating = db.rating;
const View = db.view;
const Comment = db.comment;
const Tag = db.tag;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

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
const currentDate = month1 + 1 + "/" + day + "/" + year;/////genertae current date

/////////generate token
genToken = user => {
    return jwt.sign({
      iss: 'Shubhra_B',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET);
  }


///////////////////controller to register admin//////////
exports.adminRegister = async function (req, res, next) {
    const { name, email, password } = req.body;
    const newAdmin = new db.admin({ name, email, password })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save()
                .then(newAdmin => {
                    console.log(newAdmin)

                    res.status(200).json({ message: "Admin Registered Successfully" })

                })

        })
    })
}


///////////////////controller for admin login//////////
exports.adminLogin = async function (req, res, next) {
    const { email, password } = req.body;

    //Check If User Exists
    // await db.user.find({ email: email }).exec((err, user) => {
    const admin = await Admin.findOne({ where: { email: email } })
    console.log("email", email)
    console.log("admin", admin);
    if (admin) {
        console.log("lll", admin);
        bcrypt.compare(password, admin.password, async (err, isMatch) => {
            console.log(admin);
            if (err) throw err;
            if (isMatch) {
                console.log(admin.id)
                const token = genToken(admin)
                // const token = jwt.sign(
                //     { _id: user._id, role: user.role },
                //     process.env.JWT_SECRET,
                //     {
                //       expiresIn: "1h",
                //     }
                //   );
                res.status(200).json({ token, adminid: admin.id })
            }
            else {
                return res.status(403).json({ message: "Wrong Password" });
            }
        })
    }

}


///////////////////controller to get all todos created//////////
exports.getalltodo = async (req, res) => {
    const todo = await Todo.findAll();

    res.status(200).json({ todo });

}

///////////////////controller to get all users//////////
exports.getalluser = async (req, res) => {
    const user = await User.findAll();

    res.status(200).json({ user });

}


///////////////////controller to get all tags//////////
exports.getallTags = async (req, res) => {
    const tag = await Tag.findAll()
        if(tag) {
            console.log(tag[0].tag_title)
            res.status(200).json({ tag });
        }
}



///////////////////controller to get all comments posted by a user//////////
exports.getcommentById = async (req, res) => {
    let id = req.params.id;
    const comment = await Comment.findAll({where:{ posted_by: id }})
        if(comment) {
            res.status(200).json({ comment });
        }
}


///////////////////controller to get all comments posted for a todo task//////////
exports.getcommentByTodoId = async (req, res) => {
    let id = req.params.id;
    const comment = await Comment.findAll({where:{ todo_id: id }})
        if(comment) {
            res.status(200).json({ comment });
        }
}

////////////controller to get all Active users details of the current day//////////////////////////

exports.currentDay = async (req,res) => {
    const active = await ActiveUser.findAndCountAll({where:{day:day}})
        if(active) {
            res.status(200).json({todayActiveUsers:active})
        }
        if (err) {
            res.status(400).json({todayActiveUsers:"No active users found"})
        }
}

////////////controller to get all Active users details of the current month//////////////////////////
exports.currentMonth = async (req,res) => {
    const active = await ActiveUser.findAndCountAll({where:{month:month}})
        if(active) {
            res.status(200).json({ActiveUsersByMonth:active})
        }
        if (err) {
            res.status(400).json({ActiveUsersByMonth:"No active users found"})
        }
}

////////////controller to get all registered users on the current day//////////////////////////
exports.registeredUsers = async (req,res) =>{
    const user = await User.findAndCountAll({where:{date:currentDate}});
      if(user) {
        res.status(200).json({todayRegistered:user.count})
      } if (err) {
        res.status(400).json({message:"No User Registered on today"})
      } 
}

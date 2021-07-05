const express = require('express')
// const mongoose = require('mongoose')
const passport = require('passport')
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
const currentDate = month1 + 1 + "/" + day + "/" + year;

genToken = user => {
    return jwt.sign({
      iss: 'Joan_Louji',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, 'joanlouji');
  }



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
                console.log("active usr", active_usr.count)
            }
            else {
                return res.status(403).json({ message: "Wrong Password" });
            }
        })
    }

}



exports.getalltodo = async (req, res) => {
    const todo = await Todo.findAll();

    res.status(200).json({ todo });

}

exports.getalluser = async (req, res) => {
    const user = await User.findAll();

    res.status(200).json({ user });

}

exports.getallTags = async (req, res) => {
    const tag = await Tag.findAll()
        if(tag) {
            console.log(tag[0].tag_title)
            res.status(200).json({ tag });
        }
}

///comments///

exports.getcommentById = async (req, res) => {
    let id = req.params.id;
    const comment = await Comment.findAll({where:{ posted_by: id }})
        if(comment) {
            res.status(200).json({ comment });
        }
}


exports.getcommentByTodoId = async (req, res) => {
    let id = req.params.id;
    const comment = await Comment.findAll({where:{ todo_id: id }})
        if(comment) {
            res.status(200).json({ comment });
        }
}

////////////Active users details//////////////////////////

exports.currentDay = async (req,res) => {
    const active = await ActiveUser.findAndCountAll({where:{day:day}})
        if(active) {
            res.status(200).json({todayActiveUsers:active})
        }
        if (err) {
            res.status(400).json({todayActiveUsers:"No active users found"})
        }
}

exports.currentMonth = async (req,res) => {
    const active = await ActiveUser.findAndCountAll({where:{month:month}})
        if(active) {
            res.status(200).json({ActiveUsersByMonth:active})
        }
        if (err) {
            res.status(400).json({ActiveUsersByMonth:"No active users found"})
        }
}

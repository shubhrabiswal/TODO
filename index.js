const express = require('express')
var passport = require('passport')
const db = require("./Models");
const User = db.user;
const ActiveUser = db.activeuser;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const env = require('dotenv')


require('./passport')

const user = require('./router/userrouter')
const admin = require('./router/adminrouter')
const todoRoute = require('./router/todorouter')
const todoComment = require('./router/commentrouter')
const todoActive = require('./router/activerouter')
const todoTag = require('./router/tagrouter')
const todoDownload = require('./router/excelrouter')
const todoView = require('./router/viewrouter')
const todoLike = require('./router/likerouter')
const todoRate = require('./router/raterouter')

// const ActiveUser = require('./Models/ActiveUser')

const app = express()
env.config();

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

const active_user = 0;
console.log(typeof(day))

app.use(express.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});


app.use('/user',user)
app.use('/admin',admin)
app.use('/todo', todoRoute)
app.use('/comment', todoComment)
app.use('/activeuser', todoActive)
app.use('/tag',todoTag)
app.use('/download',todoDownload)
app.use('/view',todoView)
app.use('/like',todoLike)
app.use('/rating',todoRate)


// mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', function () {
//   console.log('Connected to Mongo');
// }).on('error', function (err) {
//   console.log('Mongo Error', err);
// })
app.listen(5000, () => {
  console.log('Server is up and running at the port 5000')
})

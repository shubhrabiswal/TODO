const express = require('express')
// const mongoose = require('mongoose')
const passport = require('passport')
const db = require("./Models");
const User = db.user;
const ActiveUser = db.activeuser;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const env = require('dotenv')

require('./passport')

const todoRoute = require('./router/todorouter')
const todoComment = require('./router/commentrouter')
const todoActive = require('./router/activerouter')
const todoTag = require('./router/tagrouter')
const todoDownload = require('./router/excelrouter')
const todoView = require('./router/viewrouter')
const todoLike = require('./router/likerouter')
const todoRate = require('./router/raterouter')
const admin = require('./router/adminrouter')
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

genToken = user => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// const db = require("./Models");
db.sequelize.sync();

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});
app.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  //Check If User Exists
  // await db.user.find({ email: email }).exec((err, user) => {
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
          // res.status(200).json({ token, userid: user.id })
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

})
app.post('/register', async function (req, res, next) {
  const { email, password } = req.body;
  const newUser = new db.user({ email, password, date: currentDate })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          console.log(newUser)

          res.status(200).json({ message: "User Registered Successfully" })

        })

    })
  })



});


app.get('/registered_user', async (req,res) =>{
  const user = await db.user.findAndCountAll({where:{date:currentDate}});
    if(user) {
      res.status(200).json({todayRegistered:user.count})
    } if (err) {
      res.status(400).json({message:"No User Registered on today"})
    } 
})



app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json("Secret Data")
})

app.use('/todo', todoRoute)
app.use('/comment', todoComment)
app.use('/activeuser', todoActive)
app.use('/tag',todoTag)
app.use('/download',todoDownload)
app.use('/view',todoView)
app.use('/like',todoLike)
app.use('/rating',todoRate)
app.use('/admin',admin)

// mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', function () {
//   console.log('Connected to Mongo');
// }).on('error', function (err) {
//   console.log('Mongo Error', err);
// })
app.listen(5000, () => {
  console.log('Server is up and running at the port 5000')
})

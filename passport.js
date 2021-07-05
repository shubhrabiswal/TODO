const passport = require('passport')
const passportJWT = require("passport-jwt");
const env = require('dotenv')
env.config();
const db = require("./Models");
const User = db.user;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECRET
},
 function (jwtPayload, done) {
   return User.findByPk(jwtPayload.sub)
   .then(user => 
   {
     return done(null, user);
   }
 ).catch(err => 
 {
   return done(err);
 });
}
))
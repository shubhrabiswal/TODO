const passport = require('passport')
const passportJWT = require("passport-jwt");
const db = require("./Models");
const User = db.user;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'joanlouji'
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
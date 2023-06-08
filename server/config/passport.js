const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//client-id: 698030428965-09cdnhrm5tl2noso8r2jc4qjpop93gs4.apps.googleusercontent.com
//clientsecret: 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

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email , password , done) {
        User.findOne({email}).then(user =>{
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err ){return done(err)}
                    if(result){return done(null, user)}
                });                
            }else{
                return done('Пользователь не найден')
            }
        }).catch(err =>{
            return done(err)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: '698030428965-09cdnhrm5tl2noso8r2jc4qjpop93gs4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ["openid" , 'email' , 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({googleId: profile.id})
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
      return cb(null, newUser);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id).then((user , err) =>{
        done(err , user)
    })
})
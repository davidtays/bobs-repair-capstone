//passport is going handle authentication in Express
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User=mongoose.model('user');

passport.use(new LocalStrategy({
    usernameField: 'username'
},
function(username,password,done){
    User.findOne({username:username}, function (err,user){
        if(err) {return done(err);} //if no user
        if (!user){
            return done(null, false, {
                message: 'User not found'
            });
        };
        //if password wrong then...
        if (!user.validPassword(password)){
            return done(null,false, {
                message:'Incorrect password'
            });
        };
        //if everything is okay, login
        return done(null, user);
        });
    }

));
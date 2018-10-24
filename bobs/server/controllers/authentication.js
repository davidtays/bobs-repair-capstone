const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');



module.exports.register = function (req,res){

    var user = new User();
    user.name=reqbody.name;

    user.setPassword(req.body.password);
    
    user.save(function(err){
        var token;
        token=user.generateJwt();
        res.status(200);
        res.json({
            "token":token
        });
    });


    //confirmation
    console.log("Registering: " + req.body.username);
    res.status(200);
    res.json({
        "message":"User registered: " + req.body.username
    });
};


//login module

module.exports.login = function (req,res){
    passport.authenticate('local',function(err, user, info){
        var token;

        //passport error
        if (err){
            res.status(404).json(err);
            return;
        }

        //user found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token":token
            });
        } else{
            //user not found
            res.status(401).json(info);
        }
    }) (req,res);
}
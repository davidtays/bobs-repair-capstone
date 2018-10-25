var mongoose = require ('mongoose');
var User = mongoose.model('User');

//only look at their profile
module.exports.profileRead = function(req,res){
    //no ID=401
    if (!req.payload._id){
        res.status(401).json({
            "message":"UnauthorizedError:private profile"
        });
    }   else{
        //else.....
        User
            .findById(req.payload._id)
            .exec(function(err,user){
                res.status(200).json(user);
            });
    }
};

//confirmation
module.exports.register = function (req,res){
    console.log("Registering: " + req.body.username);
    res.status(200);
    res.json({
        "message":"User registered: " + req.body.email
    });
};
//confirmation
module.exports.register = function (req,res){
    console.log("Registering: " + req.body.username);
    res.status(200);
    res.json({
        "message":"User registered: " + req.body.email
    });
};
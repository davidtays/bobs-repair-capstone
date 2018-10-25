var User = require('../models/user');
var Question = require('../models/question');
var Role = require('../models/role');
var Service = require('../models/service');


exports.get_user_by_name = function(req, res, next){
  console.log(req.body.username + "=req.body.username");
  User.getByName(req.body.username, function(err, user){
    res.json(user)
    if(err) return res.status(500).send('there was a problem finding the user');
    if(!user.username) return res.status(404).send('No username found');
    res.status(200);
  })
};




exports.index = function(req, res, next) {
  res.json("Home Controller works!")
};

var User = require('../models/user');
var Question = require('../models/question');
var Role = require('../models/role');
var Service = require('../models/service');


exports.user_login = function(req, res, next){
  console.log(req.body.userSomething + "=req.body.userSomething");
  User.ge
}


exports.index = function(req, res, next) {
  res.json("Home Controller works!")
};

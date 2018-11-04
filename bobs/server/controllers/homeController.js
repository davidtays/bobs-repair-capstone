var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../helpers/config');
var Question = require('../models/question');
var Role = require('../models/role');
var Service = require('../models/service');
var Invoice = require('../models/invoice');


//Register a new user on POST
exports.user_register = function(req, res){
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var currentDate = new Date();
  var dateTime = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " @" + currentDate.getHours() + ":" + currentDate.getMinutes();
    var newUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    phoneNumber: req.body.phonenumber,
    email: req.body.email,
    userName: req.body.username,
    password: hashedPassword,
    dateCreated: dateTime,
    dateModified: dateTime,
    q1: "one",
    q2: "two",
    q3: "three",
    a1: "four",
    a2: "five",
    a3: "six",
    
  });
  
  User.add(newUser, (err, user) => {
    console.log(user.email + "=user.email");
    if(err) return res.status(500).send('There was  problem registering the user.');

    var token = jwt.sign({id:user._id}, config.web.secret, {
      expiresIn: 86400
    });
    res.status(200).send({auth:true, token:token});
  });
};

// Verify token on GET
exports.user_token = function(req, res) {
  User.getById(req.userId, function(err, user) {

      if (err) return res.status(500).send('There was a problem finding the user.');

      if (!user) return res.status(404).send('No user found.');

      res.status(200).send(user);
  });
};

//Login as an existing user in, on POST
exports.user_login = function(req, res){
  console.log(req.body.username + "= req.body.username");
  User.getOne(req.body.username, function(err, user){
    if(err) return res.status(500).send('Error on server.');
    if(!user) return res.status(404).send('No user found');
    localStorage.setItem('user', user);
    console.log(user.password + "=returned password");
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    console.log(hashedPassword + "=hashedPassword")

    if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

    var token = jwt.sign({id: user._id}, config.web.secret, {
      expiresIn: 86400
    });
    res.status(200).send({auth:true, token:token });
  })
};

// Logout an existing user
exports.user_logout = function(req, res) {

  res.status(200).send({ auth: false, token: null});
};

//get all services from the database
exports.all_services = function(req, res) {
  Service.getAllServices("all", function(err, services){
    
    if(err) return res.status(500).send('Error on server.');
    if(!services) return res.status(404).send('No services found');
    //console.log(services[1].name + "=returned services[1].name");
    console.log(services + "=returned services");
    res.json(services);
  });
  //res.status(200).send({ auth: false, token: null});
};

//get all services associated with the user
exports.user_invoices = function(req, res) {
Invoice.getUserInvoices(req.params.username, function(err, invoices){
    if(err) return res.status(500).send('Error on server.');
    if(!invoices) return res.status(404).send('No invoices found');
    console.log(invoices + "=returned invoices");
    res.json(invoices);
  }); 
};

//get sum of all invoices
exports.total_invoices = function(req, res){
  Invoice.getInvoiceSum("", function(err, total){
    if(err) return res.status(500).send('Error on server.');
    if(!invoices) return res.status(404).send('No invoices found');
    console.log(total + "=total from total_invoices");
    res.json(total);
  });
};

//save an invoice
exports.save_invoice = function(req, res){
  var currentDate = new Date();
  var dateTime = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " @" + currentDate.getHours() + ":" + currentDate.getMinutes();
  var newInvoice = new Invoice({
    username: req.body.username,
    date: dateTime,
    labor: req.body.labor,
    total: req.body.total,
    services: req.body.services    
  });  
  Invoice.add(newInvoice, (err, invoice) => {
    console.log(invoice.username + "=invoice.username");
    if(err) return res.status(500).send('There was  problem saving the invoice.');
    res.json(invoice);
    //res.status(200).send({auth:true, token:token});
  });
}

//get all security-questions
exports.all_questions = function(req, res){
  console.log("inside the controller for seccurity questions");
  Question.getAllQuestions("all", function(err, questions){

    if(err) return res.status(500).send('Error on server.');
    if(!questions) return res.status(404).send('No questions found');
    
    console.log(questions + "=returned questions");
    res.json(questions);
  });
}
//not used!!!!!!!!!!!!!
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

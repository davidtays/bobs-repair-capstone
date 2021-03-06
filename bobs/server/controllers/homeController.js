var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../helpers/config');
var Question = require('../models/question');
var Role = require('../models/role');
var Service = require('../models/service');
var Invoice = require('../models/invoice');
var path = require('path');


//Register a new user on POST
exports.user_register = function(req, res){
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var currentDate = new Date();
  console.log(req.body.username + "=req.body.username from user_register")
  var dateTime = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " @" + currentDate.getHours() + ":" + currentDate.getMinutes();
    var newUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    phoneNumber: req.body.phonenumber,
    address: req.body.address,
    email: req.body.email,
    userName: req.body.username,
    password: hashedPassword,
    dateCreated: dateTime,
    dateModified: dateTime,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    a1: req.body.a1,
    a2: req.body.a2,
    a3: req.body.a3,
    roles: req.body.roles    
  });
  //console.log(newUser + " = newUser from register");
  User.add(newUser, (err, user) => {
    console.log(user + "=user");
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
    console.log(user.password + "=returned password");
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    console.log(hashedPassword + "=hashedPassword")

    if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

    var token = jwt.sign({id: user._id}, config.web.secret, {
      expiresIn: 86400
    });
    res.json(user);
    //res.status(200).send({auth:true, token:token, user:user});
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

//get all invoice documents
exports.get_all_invoices = function(req,res){
  Invoice.getAllInvoices("", function(err, invoices){
    if(err) return res.status(500).send('Error on server.');
    if(!invoices) return res.status(404).send('No invoices found');
    console.log(invoices + "=returned invoices");
    res.json(invoices);
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
  });
}

//get all security-questions of user
exports.all_user_questions = function(req, res){
  console.log("inside the controller for seccurity questions");
  Question.getAllUserQuestions("all", function(err, questions){

    if(err) return res.status(500).send('Error on server.');
    if(!questions) return res.status(404).send('No questions found');
    
    console.log(questions + "=returned questions");
    res.json(questions);
  });
}

//get ALL security-questions
exports.all_questions = function(req,res){
  console.log("inside of all_questions");
  Question.getAllQuestions("all", function(err, questions){
    if(err) return res.status(500).send('Error on server.');
    if(!questions) return res.status(404).send('No Questions found');
    console.log(questions + "=returned Questions");
    res.json(questions);
  }); 
};

//update a question
exports.update_question = function(req, res, next){
  console.log(req.body + " question before");
  Question.update(req.body, function(err, question){
    if(err) return res.status(500).send('Error on server.');
    if(!question) return res.status(404).send('No question found');
    console.log(question);
    console.log("=returned question from update_question")
    res.json(question);
  })
}

//delete a question
exports.delete_question = function(req, res, next){
  console.log(" =req.params.id from homeController/delete_question")
  console.log(req.params.id);
  
  Question.delete(req.params.id, function(err, question){
    if(err) return res.status(500).send('Error on server.');
    if(!question) return res.status(404).send('No question found');
    console.log(question);
    console.log("=returned question from update_question")
    res.json(question);
  })
}

//add a question
exports.add_question = function(req, res, next){
  console.log(req.body);
  var newQuestion = new Question({
    question: req.body.question
  })
  Question.add(newQuestion, (err, question) => {
    console.log(question + "=question");
    if(err) return res.status(500).send('There was  problem adding the question.');

    res.json(question);
  });
}

//get user by name for reset Password!!!!!!!!!!!!!
exports.get_user_by_name = function(req, res, next){
  console.log(req.params.username + "=req.body.username");
  User.getOne(req.params.username, function(err, user){
    if(err) return res.status(500).send('Error on server.');
    if(!user) return res.status(404).send('No user found');
    console.log(user + "=returned user");
    res.json(user);
  })
};

//update user password
exports.update_user_password = function(req, res, next){
  console.log(req.body.password + " password before");
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  console.log(req.body.password + " password after");
  User.updatePasswordById(req.body, function(err, user){
    if(err) return res.status(500).send('Error on server.');
    if(!user) return res.status(404).send('No user found');
    console.log(user);
    console.log("=returned user from update_user")
    res.json(user);
  })
}

//update a user
exports.update_user = function(req, res, next){
  console.log(req.body.password + " password before");
  
  console.log(req.body.password + " password after");
  User.updateUserById(req.body, function(err, user){
    if(err) return res.status(500).send('Error on server.');
    if(!user) return res.status(404).send('No user found');
    console.log(user);
    console.log("=returned user from update_user")
    res.json(user);
  })
}

//delete a user
exports.delete_user = function(req, res, next){
  console.log(" =req.params.id from homeController/delete_user")
  console.log(req.params.id);
  
  User.deleteUserById(req.params.id, function(err, user){
    if(err) return res.status(500).send('Error on server.');
    if(!user) return res.status(404).send('No user found');
    console.log(user);
    console.log("=returned user from update_user")
    res.json(user);
  })
}

//get all user documents
exports.get_all_users = function(req,res){
  console.log("inside of get_all_users");
  User.getAll("all", function(err, users){
    if(err) return res.status(500).send('Error on server.');
    if(!users) return res.status(404).send('No users found');
    console.log(users + "=returned users");
    res.json(users);
  }); 
};

//get logs
exports.getLog = function(req, res) {
  res.sendFile('access.log', { root: path.join(__dirname, '../../log')});
}

exports.index = function(req, res, next) {
  res.json("Home Controller works!")
};

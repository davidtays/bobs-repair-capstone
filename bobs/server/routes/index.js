var express = require('express');
var router=express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    userProperty:'payload'
});
//applies middleware
router.get('/profile', auth, ctrlProfile.profileRead);

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');


router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//handles errors and unauthorized
app.use(function(err,req,tes,next){
    if (err.name==='UnauthorizedError'){
        res.status(401);
        res.json({"message" :err.name + ": " + err.message});
    }
});


module.exports = router;
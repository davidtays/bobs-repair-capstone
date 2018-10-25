var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
/*    a record from mlab.....if this needs changed, let david know
   *****************************************************
    ---DO WE NEED A SALT AND HASH PROPERTY?---
    -------in users---------
{
    "_id": {
        "$oid": "5bce2d7fe7179a437700c98a"
    },
    "firstname": "david",
    "lastname": "tays",
    "phonenumber": "4022191196",
    "email": "davidtays22@gmail.com",
    "username": "davidtays",
    "password": "Password1",
    "datecreated": "12/05/2017",
    "datemodified": "12/10/2017",
    "q1": "What is your favorite color?",
    "q2": "What is your mothers maiden name?",
    "q3": "What is your favorite sport?",
    "a1": "blue",
    "a2": "johnson",
    "a3": "golf"
}*/
var userSchema = new mongoose.Schema({

    username:{
        type: String,
        //unique=used for logging in
        unique: true,
        required: true
    },
    firstName:{
        type: String,
        unique: false,
        required: true
    },
    lastName:{
        type: String,
        unique: false,
        required: true
    },
    phoneNumber:{
        type: String,
        unique: false,
        required: true
    },
    address:{
        type: String,
        unique: false,
        required: true
    },
    email:{
        type: String,
        unique: false,
        required: true
    },

    // salt/hash is one-way encryption
    hash: String,
    salt: String
});

//set password
userSchema.methods.setPassword = function (password){
    this.salt=crypto.randomBytes(16).toString('hex');
    this.hash=crypto.pbkdf2Sync(password,this.salt, 1000, 64, 'sha512').toString('hex');
};
//checks the password
userSchema.methods.validPassword=function(password){
    var hash=crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
// JSON web token
userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+7);

    return jwt.sign({
        _id:this.id,
        username:this.username,
        firstName:this.firstName,
        lastName:this.lastName,
        phoneNumber:this.phoneNumber,
        address:this.address,
        email:this.email,
        exp: parseInt(expiry.getTime() / 1000),
    })
}




const User = module.exports = mongoose.model('User', userSchema);

module.exports.getByName = (thisName, callback) => {
    var query = {username: thisName};
    console.log(thisName + '=thisName from the user model');
    User.findOne(query, callback);
}
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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
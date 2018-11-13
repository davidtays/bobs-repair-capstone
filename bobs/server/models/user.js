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
    firstName:String,
    lastName:String,
    phoneNumber:String,
    address:String,
    email:String,
    userName:String,
    password:String,
    dateCreated:String,
    dateModified:String,
    q1:String,
    q2:String,
    q3:String,
    a1:String,
    a2:String,
    a3:String,
    roles:[]
}, {
    collection: 'users',
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
    })//'topsecret');
}




const User = module.exports = mongoose.model('User', userSchema);

module.exports.getByName = (thisName, callback) => {
    var query = {userName: thisName};
    console.log(thisName + '=thisName from the user model');
    User.findOne(query, callback);
}

//add a user
module.exports.add = (user,callback) => {
    console.log(user + "inside of add for save/register user");
    user.save(callback);
}

//get user by id
module.exports.getById = (id, callback) => {
    var query = {_id: id};
    User.findById(query, callback);
}

//get user by email
module.exports.getOne = (e, callback) => {
    var query = {userName: e};
    User.findOne(query,callback);
}

//get all users
module.exports.getAll = (e, callback) => {
    User.find(callback);
}

//update a user password
module.exports.updatePasswordById = (user, callback) => {
    console.log(user.password + " =id from update in model/user");
    var query = {_id: user._id};
    User.updateOne(query, {password: user.password}, callback);
}

//update a user 
module.exports.updateUserById = (user, callback) => {
    console.log(user.password + " =id from update in model/user");
    var query = {_id: user._id};
    User.updateOne(query, {
        firstName:user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        email: user.email,
        userName: user.userName,
        password: user.password,
        dateCreated: user.dateCreated,
        dateModified: user.dateModified,
        q1: user.q1,
        q2: user.q2,
        q3: user.q3,
        a1: user.a1,
        a2: user.a2,
        a3: user.a3,
        roles: user.roles
    }, callback);
}

//delete a user
module.exports.deleteUserById = (id, callback) => {
    console.log(id + "=id from delete in model/user");
    var query = {_id: id};
    User.deleteOne(query, callback);
}

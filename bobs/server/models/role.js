var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({

});

const Role = module.exports = mongoose.model('Role', roleSchema);

module.exports.getByName = (thisName, callback) => {
    var query = {role: thisName};
    console.log(thisName + '=thisName from the service model');
    Role.findOne(query, callback);
}
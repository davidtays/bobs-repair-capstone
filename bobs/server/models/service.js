var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({

});

const Service = module.exports = mongoose.model('Service', serviceSchema);

module.exports.getByName = (thisName, callback) => {
    var query = {name: thisName};
    console.log(thisName + '=thisName from the service model');
    Service.findOne(query, callback);
}
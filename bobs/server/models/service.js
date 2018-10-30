var mongoose = require('mongoose');
/*  a record from mlab.....if this needs changed, let david know
   *****************************************************
-------in services--------------
{
    "_id": {
        "$oid": "5bce2a5be7179a437700c6fb"
    },
    "name": "Virus Removal",
    "cost": 29.95
} */
var serviceSchema = new mongoose.Schema({
	services:[{
		name: String,
		cost: Number
	}]
}, {collection:'services'});

const Service = module.exports = mongoose.model('Service', serviceSchema);

module.exports.getByName = (thisName, callback) => {
    var query = {name: thisName};
    console.log(thisName + '=thisName from the service model');
    Service.findOne(query, callback);
}

module.exports.getAllServices = (thisName, callback) => {
    var query = {name: thisName};
    console.log(thisName + '=thisName from the service model');
    Service.find(callback);
}
var mongoose = require('mongoose');
/*a record from mlab.....if this needs changed, let david know
   *****************************************************
    -------in roles------------
    {
        "_id": {
            "$oid": "5bce2ae2e7179a437700c757"
        },
        "role": "standard"
    }
   */
var roleSchema = new mongoose.Schema({

});

const Role = module.exports = mongoose.model('Role', roleSchema);

module.exports.getByName = (thisName, callback) => {
    var query = {role: thisName};
    console.log(thisName + '=thisName from the service model');
    Role.findOne(query, callback);
}
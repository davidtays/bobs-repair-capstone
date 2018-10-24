var mongoose = require('mongoose');
/* a record from mlab.....if this needs changed, let david know
   *****************************************************
   ------in questions-------
{
    "_id": {
        "$oid": "5bce29a5e7179a437700c647"
    },
    "question": "What is your favorite color?"
}

*/
var questionSchema = new mongoose.Schema({

});

const Question = module.exports = mongoose.model('Question', questionSchema);

module.exports.getAll = (thisName, callback) => {
    var query = {question: thisName};
    console.log(thisName + '=thisName from the service model');
    Question.find(callback);
}
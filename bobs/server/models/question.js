var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({

});

const Question = module.exports = mongoose.model('Question', questionSchema);

module.exports.getAll = (thisName, callback) => {
    var query = {question: thisName};
    console.log(thisName + '=thisName from the service model');
    Question.find(callback);
}
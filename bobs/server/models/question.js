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
    question: String
}, {collection:'questions'});

const Question = module.exports = mongoose.model('Question', questionSchema);

module.exports.getAllUserQuestions = (thisName, callback) => {
    var query = {question: thisName};
    console.log(thisName + '=thisName from the question model');
    Question.find(callback);
}

module.exports.getAllQuestions = (e, callback) => {
    Question.find(callback);
}

//update a Question 
module.exports.update = (question, callback) => {
    console.log(question._id + " =id from update in model/user");
    var query = {_id: question._id};
    Question.updateOne(query, {
        question: question.question
    }, callback);
}

//delete a Question
module.exports.delete = (id, callback) => {
    console.log(id + "=id from delete in model/user");
    var query = {_id: id};
    Question.deleteOne(query, callback);
}

//add a Question
module.exports.add = (question,callback) => {
    console.log(question + "inside of add for save/register user");
    question.save(callback);
}
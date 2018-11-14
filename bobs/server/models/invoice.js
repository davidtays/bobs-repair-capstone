
var mongoose = require('mongoose');
/**
 * {
    "_id": {
        "$oid": "5bce2c0ee7179a437700c7ef"
    },
    "username": "davetays",
    "date": "12/06/2017",
    "labor": 100,
    "total": 219.97,
    "services": [
        "Password Reset",
        "Spyware Removal"
    ]
}
 */
var invoiceSchema = new mongoose.Schema({
    username: String,
    date: String,
    labor: Number,
    total: Number,
    services: []
}, {collection: 'invoices'});

const Invoice = module.exports = mongoose.model('Invoices', invoiceSchema);

module.exports.getUserInvoices = (username, callback) => {
    var query = {username: username};
    console.log(username + "=username frim the invoice model");
    Invoice.find(query, callback);
}

module.exports.getInvoiceSum = (username, callback) => {
    Invoice.aggregate([{ $group: { _id: {$productTotal: ""}, total: { $sum: "$total"}}}], callback);
}

module.exports.getAllInvoices = (thisName, callback) => {
    console.log(thisName + '=thisName from the invoice model-getAllInvoices');
    Invoice.find(callback);
}

module.exports.add = (invoice,callback) => {
    invoice.save(callback);
}
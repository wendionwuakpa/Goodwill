const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://goodwill:pass@cluster0.dpqxd.mongodb.net/goodwill?retryWrites=true&w=majority';
module.exports = db;
const dbConfig = require("../db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.blogs = require("./Content")(mongoose);

module.exports = db;

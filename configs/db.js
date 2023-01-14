const mongoose = require('mongoose');
require("dotenv").config()

require('dotenv').config()
const  connection = mongoose.connect(process.env.mongoURL)
// const  connection = mongoose.connect('mongodb://127.0.0.1:27017/lecAuth');


module.exports = {
  connection
}

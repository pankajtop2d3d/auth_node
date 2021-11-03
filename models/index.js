require('../config/db.config'); //INCLUDE DB CONFIG FILE
const db = {};
db.user = require("../models/user.js");//INCLUDE USER MODEL
db.video = require("../models/video.js");//INCLUDE VIDEO MODEL
module.exports = db;
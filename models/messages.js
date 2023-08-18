const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
userN: String,
sent: Number,
serverN: String,
serverID: String,
userID: String


})

module.exports = mongoose.model("MSent", msgSchema)
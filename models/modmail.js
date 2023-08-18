const mongoose = require("mongoose");

const ModMail = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fromUser:  String,
    fromUserID: String,
    Answered: Boolean,
    answeredBy: String,
    Question: String,
    caseID: Number,
    time: String,
    serverID: String
});

module.exports = mongoose.model("ModMail", ModMail)
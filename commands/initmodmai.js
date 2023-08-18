const Discord = require("discord.js");
const mongoose = require('mongoose')
const ModMail = require("../models/modmail.js")

module.exports.run = async (bot, message, args) => {

    const modmail = new ModMail({
        _id: mongoose.Types.ObjectId(),
        fromUser:  null,
        fromUserID: null,
        Answered: false,
        answeredBy: "n/a",
        Question: null,
        caseID: 1,
        time: null
    });

    modmail.save()
.then(result => console.log(result))
.catch(err => console.log(err));
}
module.exports.help = {
  name: "initmodmail"
}


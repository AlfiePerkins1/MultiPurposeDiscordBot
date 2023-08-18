const Discord = require("discord.js");
const mongoose = require('mongoose'); 
const ms = require("ms");
const fs = require("fs");
const ModMail = require("../models/modmail.js")
const moment = require("moment");
 

module.exports.run = async (bot, message, args) => {

let caseIDfromMessage = args[0];
let casereply = args.slice(1).join(" ");

if(!message.member.roles.find(r=> r.name === "Mod")) {
    message.reply("You dont have permission to reply to modmails")
}
else {

ModMail.findOne({caseID : caseIDfromMessage}, (err, result) => {
    if(err) {
        console.log(err)
        message.reply("Error, make sure the CaseID is correct")
    }
    else{
    console.log(result)
    
        message.reply("Modmail reply sent to user")
   
    let userN = result.fromUser
    console.log(userN)
    let userID = result.fromUserID
    bot.users.get(userID).send(`**Modmail Reply:** \n${casereply} \nAnswered by __${message.author.username}__, if question is still unanswered please DM ${message.author.username} or submit a new modmail!`);
    }

    result.Answered = true,
    result.answeredBy = message.author.username
    result.save().catch(err => console.log(err));



    


}); // FindOne end 
}
} // closes module.exports
module.exports.help = {
    name: "reply"
  }
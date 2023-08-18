const Discord = require("discord.js");
const mongoose = require('mongoose'); 
const ms = require("ms");
const fs = require("fs");
const ModMail = require("../models/modmail.js")
const moment = require("moment");
 

module.exports.run = async (bot, message, args) => {

let modmailChannel = message.guild.channels.find(c => c.name === "modmail") 

ModMail.find({Answered : false , serverID : message.guild.id}, (err, result) => {
    if(err) {
        console.log(err)

    }
    else{
        for (let i = 0; i < result.length; i++) {

        let modmailEmbed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle("New modmail - Unanswered")
            .addField("Case ID: " , `${result[i].caseID}`) //This is always defined though 
            .addField("From:", `${result[i].fromUser}`)
            .addField("Question: ", `${result[i].Question}`)
            .addField("Time: ", result[i].time)
            .setFooter(`Type %reply ${result[i].caseID} <message> to reply the user`);
    
        modmailChannel.send(modmailEmbed)
          }

        

    }

    


}); // FindOne end 
} // closes module.exports
module.exports.help = {
    name: "updatechannel"
  }
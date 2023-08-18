const Discord = require("discord.js");
const mongoose = require('mongoose'); 
const ms = require("ms");
const fs = require("fs");
const ModMail = require("../models/modmail.js")
const moment = require("moment");
 

module.exports.run = async (bot, message, args) => {
let modmailChannel = message.guild.channels.find(c => c.name === "modmail")
let mUser = message.author
let newCaseID;
let server = message.guild.id
ModMail.findOne().sort( {caseID : -1}).exec(function (err, result) {

    if(err) console.log(err);
    let hCaseID = result.caseID;
    newCaseID = hCaseID + 1;   
     
       

message.author.send("What is your question? Only 1 message will be recorded").then(async dmAuthor => {
const collector = new Discord.MessageCollector(dmAuthor.channel, m => m.author.id === message.author.id);
collector.on('collect', async message => {
    

    collector.stop();
    let collectedmessage = message.content;

    let modmailEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTitle("New modmail - Unanswered")
    .addField("Case ID: " , `${newCaseID}`) //This is always defined though 
    .addField("From:", `${mUser.username}`)
    .addField("Question: ", `${collectedmessage}`)
    .addField("Time: ", moment(message.createdAt).format('DD/MM/YY, h:mm a'))
    .setFooter(`Type %reply ${newCaseID} <message> to reply the user`);

    modmailChannel.send(modmailEmbed)

    //console.log(newCaseID);
    const modmail = new ModMail({
        _id: mongoose.Types.ObjectId(),
        fromUser:  mUser.username,
        fromUserID: mUser.id,
        Answered: false,
        answeredBy: "n/a",
        Question: collectedmessage,
        caseID: newCaseID,          // Always Undefined 
        time: moment(message.createdAt).format('DD/MM/YY, h:mm a'),
        serverID: server
    }); // Ends modmail schema
    
    modmail.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.author.send(`Your messaged has been received, \nyour case ID: **${newCaseID}**, we will get back to you as soon as possible`)
    
       

}) // Brackets end .then async dmAuthor
}) //Brackets ends findOne
}) // Brackets ends message collector

} // closes module.exports
module.exports.help = {
    name: "modmail"
  }
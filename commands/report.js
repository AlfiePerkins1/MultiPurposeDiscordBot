const Discord = require("discord.js");
const Report = require("../models/reports.js");
 const mongoose = require('mongoose');
 const ms = require("ms");
const fs = require("fs");
const moment = require("moment");
 

module.exports.run = async (bot, message, args) => {


let rUser = message.guild.member(message.mentions.users.first());
if (!rUser) return message.channel.send("Couldnt Find user")
let rreason = args.join(" ").slice(22);



let reportEmbed = new Discord.RichEmbed()

.setDescription("Reports")
.setColor("#ff0000")
.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Reason", rreason)
//.addField("This user has been reported" , userr , " time(s) before")
.addField("This report has been logged to the database", " \u200b ")
.setFooter("Bot created by Alfie#6452", bot.user.displayAvatarURL )
.setURL("https://twitter.com/Perkins_Alfie");

let reportschannel = message.guild.channels.find(c => c.name === "reports-log")
if(!reportschannel) return message.channel.send("Ait bossman there aint no channel called reports fix dat")

message.delete().catch(O_o=>{});
reportschannel.send(reportEmbed);
message.author.sendMessage("Your report of" + `${rUser}` + " on "  + moment(message.createdAt).format('DD YY, h:mm: a') + " has been noted. Thanks" )




const report = new Report({
  _id: mongoose.Types.ObjectId(),
  username: rUser.user.username,
  userID: rUser.id,
  reason: rreason,
  rUsername: message.author.username,
  rId: message.author.id,
  time: moment(message.createdAt).format('DD YY, h:mm: a')
});


report.save()
.then(result => console.log(result))
.catch(err => console.log(err));










} // closes module.exports
module.exports.help = {
    name: "report"
  }
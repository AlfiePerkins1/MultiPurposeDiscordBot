const Discord = require('discord.js')
const mongoose = require("mongoose");

const MSent = require("../models/messages.js")

module.exports.run = async (bot, message, args) => {


await message.delete();



if(!message.guild.member(message.mentions.users.first())) {

    MSent.findOne({
        userID: message.author.id, 
        serverID: message.guild.id
    }, (err, sent) => {
    
    
        if(err) console.log(err);
    
    let embed = new Discord.RichEmbed()
        .setTitle(`Messages sent by ${message.author.username }`)
        .setColor("#42f442")
        .setThumbnail(message.author.displayAvatarURL)
     if (!sent){
        embed.addField("Sent: ", "0", true);
        return message.channel.send(embed);
    
        }else{
            embed.addField("Sent:", sent.sent, true)
            return message.channel.send(embed);
    
        }
    
    })
    

}
else{
    let msgUser = message.guild.member(message.mentions.users.first());

MSent.findOne({
    userID: msgUser.id, 
    serverID: message.guild.id
}, (err, sent) => {


    if(err) console.log(err);

let embed = new Discord.RichEmbed()
    .setTitle(`Messages sent by <@${msgUser.id}>`)
    .setColor("#42f442")
    .setThumbnail(msgUser.displayAvatarURL)
    

 if (!sent){
    embed.addField("Sent: ", "0", true);
    embed.setFooter("Since 30/01/2020 - 90% uptime")
    return message.channel.send(embed);

    }else{
        embed.addField("Sent:", sent.sent, true)
        embed.setFooter("Since 30/01/2020 - 90% uptime")
        
        return message.channel.send(embed);

    }

})
}



} // closes module.exports
module.exports.help = {
    name: "messages"
  }
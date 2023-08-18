const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let gRole = message.guild.roles.find(r => r.name === "RevFives Tier 2 Captains");
    if(!gRole) return message.reply
    ("That role doesnt exist reee");


    if(message.member.roles.find(r=> r.name === "Admin")) {

        var userlist = message.mentions.members; 
        userlist.forEach(function(user){
        user.addRole(gRole)
});



    }
    else  
    {
        message.channel.send("Only Admins can use this command");
    }
}
module.exports.help = {
  name: "massadd"
}
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {


  let cEmbed = new Discord.RichEmbed()




  .setTitle("Command Help")

.addField("__**Admin Only Commands**__")
.addField("Create role" , "Usage: `createroll Role Name - Description: Creates a role (N.B The Roles will have admininstrator perms) ")
.addField("Audio Countdown ", "Usage: `startcda - Description: Starts an voice only countdown. ")

.addField("__**Mod Only Commands**__")
.addField("AddRole ", "Usage:  `addrole @user role name - Description: Grants the tagged user with the aforementioned role ")
.addField("Mute ", "Usage: `mute @user legnth - Description: Mutes the tagged user for the aforementioned legnth of time ")

.addField("__**Countdown Master Only Commands**__")
.addField("Start Countdown ", " Usage: `startcd - Description: Starts a CD ")
.addField("Voting ", " Usage: `vote Vote Title - Description: Starts a vote with the aforementioned title")

.addField("__**Public Commands:**__")
.addField("Command List ", "Usage: `commandlist ")
.addField("Countdown Help", "Usage: `cdhelp - Description: Prints a FAQ section roughly explaining how countdowns work!")
.addField("Report ", "Usage: `report @user Reason - Description: Reports the mentioned user with the aforementioned reason ")


.setColor("#4286f4")
.setFooter("Bot created by Alfie#6452", bot.user.displayAvatarURL )
.setURL("https://twitter.com/Perkins_Alfie")


 

message.author.send(cEmbed);

}
module.exports.help = {
  name: "commandlist"
}


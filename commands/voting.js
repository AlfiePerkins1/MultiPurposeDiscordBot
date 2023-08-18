const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {


  eTitle = args.join(' ');
 

  if(message.member.roles.find("name", "Countdown Masters")){

message.channel.send(`A New Vote Has been made by ${message.author.username}`, {tts: false})
  const embed = new Discord.RichEmbed()
  .setColor("#008000")
  .setFooter("React to vote.")
  .setDescription(`Poll Created by ${message.author.username}`)
  .setTitle(eTitle)
  .setFooter("Bot created by Alfie#6452", bot.user.displayAvatarURL )
.setURL("https://twitter.com/Perkins_Alfie");

  let msg = await message.channel.send(embed);

  await msg.react('✅'); 
  await msg.react('❌'); 
  }

  else{

    message.channel.send("Ait bro imma tell u this once and once only, you dont have perms ")

  }

} // closes module.exports
module.exports.help = {
    name: "vote"
  }

  


  
 
 
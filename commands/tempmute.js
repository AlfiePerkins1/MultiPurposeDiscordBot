const Discord = require("discord.js");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {




    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Gimmie a user to mute or i mute u");

    if(message.member.roles.find("name", "Mod")){

    // if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("U dont have perms innit");
    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: true
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("How long? Hello???");
  
    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))} l8a nerd`);
  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
  
    }
    else{
        message.channel.send("Only Mods can mute people, get gud fam");
        
    }


} // closes module.exports
module.exports.help = {
    name: "mute" 
  }
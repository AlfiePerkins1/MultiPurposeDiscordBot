// Bot Requirements
const auth = require("./auth.json");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const bot = new Discord.Client({disableEveryone: false});
const fs = require("fs");
bot.commands = new Discord.Collection();
const MSent = require("./models/messages.js")



fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Commands could not be loaded.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!` );
    bot.commands.set(props.help.name, props);
  });
});

// Bot Login

bot.on("ready", async => {
  console.log(`Now Online`);
  bot.user.setActivity('your dms', { type: 'LISTENING' });
 console.log(bot.guilds.map(g=>g.name))
 mongoose.connect("mongodb://localhost/DatabaseMS", {useUnifiedTopology: true, useNewUrlParser: true });
 

});


// Bot Message Info

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = auth.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  
  if(message.content.startsWith(prefix)) {
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message,args)
  } else {
      let coinstoadd = 1;
      console.log( "Message sent by: " + message.author.username );
      MSent.findOne({
              userN: message.author.username, 
              serverID: message.guild.id
      }, (err, sent) => {
        if(err) console.log(err);
        if(!sent){
          const newMSent = new MSent({
            userN: message.author.username,
            sent: coinstoadd,
            serverN: message.guild.name,
            userID: message.author.id,
            serverID: message.guild.id
            
          })

newMSent.save().catch(err => console.log(err));
        }else{
          sent.sent = sent.sent + coinstoadd;
          sent.save().catch(err => console.log(err));
        }
      })
    }
  })


 
bot.on('messageDelete', async (message) => {
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  const logs = message.guild.channels.find(c => c.name === "log");
  
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('log', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
  }  

  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }

  let deleteEmbed = new Discord.RichEmbed()
  .setDescription("Deleted Message")
  .setColor("#ff0000")
  .addField("User who deleted:" ,user)
  .addField("Message Content:" ,message.content)
  .addField("In channel:" ,message.channel.name)

logs.send(deleteEmbed)

 } )
bot.login(auth.token);


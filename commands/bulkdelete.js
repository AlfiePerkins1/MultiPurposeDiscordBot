const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if(message.member.roles.find(r=> r.name === "Mod")) {

let deleteamount = args[0];

message.channel.bulkDelete(deleteamount).then(() => {
    message.channel.send(`Deleted ${deleteamount} messages.`).then(msg => msg.delete(3000));
  });

}
else {
        message.reply("You do not have permission to use this command sorry")
}
}
module.exports.help = {
  name: "delete"
}

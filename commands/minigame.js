const Discord = require("discord.js");
const mongoose = require('mongoose'); 
//const TotalGames = require("../models/totalgames.js")
//const CurrentGame = require("../models/currentgame.js")
const moment = require("moment");

module.exports.run = async (bot, message, args) => {


message.channel.send("Type the amount of players playing (3+) ")

const collector = new Discord.MessageCollector(m => m.author.id === message.author.id);
collector.on('collect', async message => {

    collector.stop();
    let playeramount = message.content;
console.log(playeramount);
});

}
module.exports.help = {
  name: "startgame"
}

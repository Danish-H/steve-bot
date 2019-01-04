const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    let fact = await new neko().getSFWFact();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setTitle("Fact")
        .setDescription(fact.fact)
        .setFooter(`Requested by ${msg.author.username}`);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "fact"
}
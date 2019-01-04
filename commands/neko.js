const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    let nek = await new neko().getSFWNeko();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setImage(nek.url)
        .setFooter(nek.url);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "neko"
}
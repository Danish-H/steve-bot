const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    let cat = await new neko().getSFWMeow();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setDescription("Meow :cat:")
        .setImage(cat.url)
        .setFooter(cat.url);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "cat"
}
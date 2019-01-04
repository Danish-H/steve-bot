const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    let mention = msg.mentions.members.first();
    if(!args[0]) return msg.channel.send("You can't slap air.");
    if(!mention) return msg.channel.send("You can't slap imaginary friends.");
    let slap = await new neko().getSFWSlap();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setDescription(`**${msg.author}** slapped **${mention}**.`)
        .setImage(slap.url)
        .setFooter(slap.url);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "slap"
}
const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    let mention = msg.mentions.members.first();
    if(!args[0]) return msg.channel.send("You can't kiss air.");
    if(!mention) return msg.channel.send("You can't kiss imaginary friends.");
    let kiss = await new neko().getSFWKiss();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setDescription(`**${msg.author}** kissed **${mention}**.`)
        .setImage(kiss.url)
        .setFooter(kiss.url);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "kiss"
}
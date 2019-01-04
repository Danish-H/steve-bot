const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    let mention = msg.mentions.members.first();
    if(!args[0]) return msg.channel.send("You can't hug air.");
    if(!mention) return msg.channel.send("You can't hug imaginary friends.");
    let hug = await new neko().getSFWHug();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setDescription(`**${msg.author}** hugged **${mention}**.`)
        .setImage(hug.url)
        .setFooter(hug.url);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "hug"
}
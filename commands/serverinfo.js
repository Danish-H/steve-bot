const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    let server = msg.guild;
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setThumbnail(server.iconURL)
        .setTitle(`${server.name}'s information:`)
        .setDescription(`**ID:** ${server.id}\n**Created on:** ${server.createdAt}\n**Members:** ${server.memberCount}`)
        .setFooter(`Requested by ${msg.author.username}`);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "serverinfo"
}
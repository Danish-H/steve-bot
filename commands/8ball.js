const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const neko = require("nekos.life");

module.exports.run = async (bot, msg, args) => {
    if(!args[0]) return msg.channel.send(`You need to ask a question. For example: \`${botConfig.prefix}8ball Will I ever get to leave this server?\``)
    let ball = await new neko().getSFW8Ball();
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setDescription(`**Question:** ${args.join(" ")}\n**Answer:** ${ball.response}`)
        .setImage(ball.url)
        .setFooter(`Requested by ${msg.author.username}`);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "8ball"
}
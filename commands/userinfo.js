const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    let user = msg.author;
    let mention = msg.mentions.members.first();
    if(mention) {
        user = mention.user;
    } else if(args[0]) {
        return msg.channel.send(`Are you sure you typed in the command correctly? To see your own information, use \`${botConfig.prefix}userinfo\`. To get someone else's, use \`${botConfig.prefix}userinfo @mention\`.`);
    }
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setThumbnail(user.displayAvatarURL)
        .setTitle(`${user.username}'s information:`)
        .setDescription(`**Username:** ${user.username}#${user.discriminator}\n**ID:** ${user.id}\b**Created on:** ${user.createdAt}`)
        .setFooter(`Requested by ${msg.author.username}`);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "userinfo"
}
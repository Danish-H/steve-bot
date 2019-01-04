const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    let user = msg.author;
    let mention = msg.mentions.members.first();
    if(mention) {
        user = mention.user;
    } else if(args[0]) {
        return msg.channel.send(`Are you sure you typed in the command correctly? To see your own avatar, use \`${botConfig.prefix}avatar\`. To get someone else's, use \`${botConfig.prefix}avatar @mention\`.`);
    }
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setImage(user.displayAvatarURL)
        .setFooter(`Requested by ${msg.author.username}`);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "avatar"
}
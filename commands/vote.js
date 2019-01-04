const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

const agree = "✅";
const disagree = "❎";

module.exports.run = async (bot, msg, args) => {
    if(!args[0]) return msg.channel.send(`Are you sure you typed in the command correctly? To vote do \`${botConfig.prefix}vote <subject>\`.`)
    let sender = msg.author.username;
    let str = args.join(" ");
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setTitle(str)
        .setFooter(`Asked by ${sender}`);
    let message = await msg.channel.send(embed);
    await message.react(agree);
    await message.react(disagree);
    const reactions = await message.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 15000});
    let agreecount = 0
    if(reactions.get(agree)) agreecount = reactions.get(agree).count - 1;
    let disagreecount = reactions.get(disagree).count - 1;
    if(agreecount === 0 && disagreecount === 0) return result(msg, str, agreecount, disagreecount, sender);
    if(agreecount === 0) return result(msg, str, 0, disagreecount, sender);
    result(msg, str, agreecount, disagreecount, sender);
}

function result(msg, title, up, down, author) {
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setTitle(title)
        .setDescription(`✅ **${up}**     ❎ **${down}**`)
        .setFooter(`Asked by ${author}`);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "vote"
}
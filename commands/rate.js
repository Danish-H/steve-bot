const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    if(!args[0]) return msg.channel.send(`${msg.author.username} is ${Math.floor(Math.random() * 100)}/100.`);
    msg.channel.send(`${args.join(" ")} is ${Math.floor(Math.random() * 100)}/100.`);
}

module.exports.help = {
    name: "rate"
}
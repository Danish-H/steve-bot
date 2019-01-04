const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    if(!args[0]) return msg.channel.send("You need to tell me what to pick from.");
    msg.channel.send(args[Math.floor(Math.random() * (args.length))]);
}

module.exports.help = {
    name: "pick"
}
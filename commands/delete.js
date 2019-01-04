const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	if(!msg.member.roles.find("name", "Admin") && !msg.member.roles.find("name", "Administrator")) return msg.channel.send("You're not the boss of me.");
    if(!args[0]) return msg.channel.send("Please specify the amount of messages you want to delete.");
    if(args[0] < 1 || args[0] > 50) return msg.channel.send("Please use a number from 1 to 50.");
    if(args >= 1 && args[0] <= 50) return msg.channel.bulkDelete(args[0]).then(msg.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(3000)));
    msg.channel.send("Are you sure you entered a real number?")
}

module.exports.help = {
    name: "delete"
}
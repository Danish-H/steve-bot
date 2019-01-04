const botConfig = require("../botconfig.json");
const Discord = require("discord.js");
const urban = require("urban");

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        urban(args.join(" ")).first(json => {
            if(!json) return msg.channel.send("No results.");
            let embed = new Discord.RichEmbed()
                .setColor(botConfig.color)
                .setTitle(json.word)
                .setDescription(json.definition)
                .addField("👍", json.thumbs_up, true)
                .addField("👎", json.thumbs_down, true)
                .setFooter(`Written by ${json.author}`);
            return msg.channel.send(embed);
        });
        return;
    }
    urban.random().first(json => {
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle(json.word)
            .setDescription(json.definition)
            .addField("👍", json.thumbs_up, true)
            .addField("👎", json.thumbs_down, true)
            .setFooter(`Written by ${json.author}`);
        msg.channel.send(embed);
    });
}

module.exports.help = {
    name: "urban"
}
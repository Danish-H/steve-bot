const botConfig = require(`../botconfig.json`);
const Discord = require(`discord.js`);

module.exports.run = async (bot, msg, args) => {
    if(!args[0]) {
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle(`❔ Help commands`)
            .setDescription(`**Try one of the following to see a list of all commands.**\n\`${botConfig.prefix}help general\`**,**\n\`${botConfig.prefix}help music\`**,**\n\`${botConfig.prefix}help fun\`**,**\n\`${botConfig.prefix}help admin\``);
        msg.channel.send(embed);
    } else if(args[0] === `general`) {
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle(`⚙ General commands`)
            .setDescription(`\`${botConfig.prefix}serverinfo\`**,**\n\`${botConfig.prefix}userinfo\`**,**\n\`${botConfig.prefix}userinfo @mention\`**,**\n\`${botConfig.prefix}avatar\`**,**\n\`${botConfig.prefix}avatar @mention\``);
        msg.channel.send(embed);
    } else if(args[0] === `music`) {
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle(`🎵 Music commands`)
            .setDescription(`\`${botConfig.prefix}play <url/keywords>\`**,**\n\`${botConfig.prefix}skip\`**,**\n\`${botConfig.prefix}queue\`**,**\n\`${botConfig.prefix}now\`**,**\n\`${botConfig.prefix}pause\`**,**\n\`${botConfig.prefix}resume\`**,**\n\`${botConfig.prefix}stop\``);
        msg.channel.send(embed);
    } else if(args[0] === `fun`) {
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle(`😈 Fun commands`)
            .setDescription(`\`${botConfig.prefix}hug @mention\`**,**\n\`${botConfig.prefix}slap @mention\`**,**\n\`${botConfig.prefix}insult\`**,**\n\`${botConfig.prefix}insult @mention\`**,**\n\`${botConfig.prefix}cat\`**,**\n\`${botConfig.prefix}8ball <question>\`**,**\n\`${botConfig.prefix}urban\`**,**\n\`${botConfig.prefix}urban <word/phrase>\`**,**\n\`${botConfig.prefix}rate\`**,**\n\`${botConfig.prefix}vote\`**,**\n\`${botConfig.prefix}meme facts <caption>\`**,**\n\`${botConfig.prefix}meme drake <line 1>|<line 2>\``);
        msg.channel.send(embed);
    } else if(args[0] === `admin`) {
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle(`🛠 Admin commands`)
            .setDescription(`\`${botConfig.prefix}delete <num>\``);
        msg.channel.send(embed);
    }
}

module.exports.help = {
    name: `help`
}
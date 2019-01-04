const botConfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    let victim = msg.author.username;
    if (args[0]) victim = args.join(" ");
    let insults = [
        `If laughter is the best medicine, ${victim}'s face must be curing the world.`,
        `${victim} is so ugly, they scared the crap out of the toilet.`,
        `${victim}'s family tree must be a cactus because everybody on it is a prick.`,
        `No I'm not insulting ${victim}, I'm describing them.`,
        `If I had a face like ${victim}'s, I'd sue my parents.`,
        `${victim}'s birth certificate is an apology letter from the condom factory.`,
        `I guess ${victim} proves that even god makes mistakes sometimes.`,
        `The only way ${victim} will ever get laid is if they crawl up a chicken's ass and wait.`,
        `${victim} is so fake, Barbie is jealous.`,
        `I’m jealous of people that don’t know ${victim}!`,
        `${victim} is so ugly, when their mom dropped them off at school she got a fine for littering.`
    ]
    msg.channel.send(insults[Math.floor(Math.random() * (insults.length))]);
}

module.exports.help = {
    name: "insult"
}
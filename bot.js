console.log("Copyright 2018 Danish Humair. All rights reserved.\n");

const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(botConfig.GOOGLE_API_KEY);
const queue = new Map();

fs.readdir("./commands/", (err, files) => {
    if(err) return console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) return console.log("No commands were discovered.");
    let count = 0;
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[${count = count + 1}] ${f} was discovered.`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log(`\n${bot.user.username} is ready.`);
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(`Invite: ${link}\n`);
    } catch (e) {
        console.log(e.stack);
    }
    bot.user.setActivity(`${botConfig.prefix}help | ${botConfig.presence}`, {type: "WATCHING"});
});

bot.on("message", async msg => {
    if(msg.author.bot || msg.channel.type === "dm") return;
    let prefix = botConfig.prefix;
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0].toLowerCase();
    let args = msgArray.slice(1);
    if(!cmd.startsWith(prefix)) return;
    let command = bot.commands.get(cmd.slice(prefix.length));
    if(command) command.run(bot, msg, args);

    if(cmd === `${prefix}ping`) return msg.channel.send("Pong!");

    const voiceChannel = msg.member.voiceChannel;
    const serverQueue = queue.get(msg.guild.id);
    let searchstring = args.join(" ");

    if(cmd === `${prefix}play`) {
        const url = args[0].replace(/<.+>/g, '$1');
        if(!voiceChannel) return msg.channel.send("You need to be in a voice channel in order to use that command.");
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchstring, 1);
                var video = await youtube.getVideoByID(videos[0].id);
            } catch (err) {
                console.log(err);
                return msg.channel.send("No results were found.");
            }
        }

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            thumbnail: video.thumbnails.medium.url
        }

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                playing: true
            }
            queue.set(msg.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(msg.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(error);
                queue.delete(msg.guild.id);
                return msg.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            let embed = new Discord.RichEmbed()
                .setColor(botConfig.color)
                .setThumbnail(song.thumbnail)
                .setTitle("Added to the queue:")
                .setDescription(`**${song.title}**`);
            msg.channel.send(embed);
        }
        return;
    }

    if(cmd === `${prefix}letter`) {
        if(!voiceChannel) return msg.channel.send("You need to be in a voice channel in order to use that command.");
        try {
            var video = await youtube.getVideo("https://www.youtube.com/watch?v=B1Gl_z-pgz8");
        } catch (error) {
            console.log(error);
        }

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            thumbnail: video.thumbnails.medium.url
        }

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                playing: true
            }
            queue.set(msg.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(msg.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(error);
                queue.delete(msg.guild.id);
                return msg.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            let embed = new Discord.RichEmbed()
                .setColor(botConfig.color)
                .setThumbnail(song.thumbnail)
                .setTitle("Added to the queue:")
                .setDescription(`**${song.title}**`);
            msg.channel.send(embed);
        }
        return;
    }

    if(cmd === `${prefix}skip`) {
        if(!voiceChannel) return msg.channel.send("You need to be in a voice channel in order to use that command.");
        if(!serverQueue) return msg.channel.send("There is nothing being played at the moment.");
        serverQueue.connection.dispatcher.end();
        return;
    }

    if(cmd === `${prefix}queue`) {
        if(!serverQueue) return msg.channel.send("There is nothing being played at the moment.");
        let c = 0;
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setTitle("Queue:")
            .setDescription(`${serverQueue.songs.map(song => `**${c = c + 1}. ${song.title}**`).join('\n')}`);
        return msg.channel.send(embed);
    }

    if(cmd === `${prefix}now`) {
        if(!serverQueue) return msg.channel.send("There is nothing being played at the moment.");
        let embed = new Discord.RichEmbed()
            .setColor(botConfig.color)
            .setThumbnail(serverQueue.songs[0].thumbnail)
            .setTitle("Currently playing:")
            .setDescription(`**${serverQueue.songs[0].title}**`);
        return msg.channel.send(embed);
    }

    if(cmd === `${prefix}pause`) {
        if(serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send("***Paused the music.***")
        }
        return msg.channel.send("There is nothing being played at the moment.");
    }

    if(cmd === `${prefix}resume`) {
        if(serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send("***Resumed the music.***")
        }
        return msg.channel.send("There is nothing being played at the moment.");
    }

    if(cmd === `${prefix}stop`) {
        if(!voiceChannel) return msg.channel.send("You need to be in a voice channel in order to use that command.");
        if(!serverQueue) return msg.channel.send("There is nothing playing at the moment.");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        return;
    }
});

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    let embed = new Discord.RichEmbed()
        .setColor(botConfig.color)
        .setThumbnail(song.thumbnail)
        .setTitle("Now playing:")
        .setDescription(`**${song.title}**`);
    return serverQueue.textChannel.send(embed);
}

bot.on('error', console.error);
bot.login(botConfig.TOKEN);
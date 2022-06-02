const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "play",
  description: "Play a song!",
  aliases: ["p"],

  run: async(client, message, args) =>  {

    const VoiceChannel = message.member.voice.channel;
    const music = args.join(" ")

    if(!music) return message.reply(":x: | Provide a Song name or a link to play a Song.")

    let embed_1 = new MessageEmbed()
    .setDescription(':x: | You must be in a voice channel to in order listen music.')
    .setColor('RANDOM');
    if(!VoiceChannel) return message.reply({embeds: [embed_1]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

    let embed_2 = new MessageEmbed()
    .setDescription(`:x: | I being used in <#${message.guild.me.voice.channelId}>!`)
    .setColor('RANDOM');
    if(message.guild.me.voice.channelId && VoiceChannel.id !== message.guild.me.voice.channelId) return message.reply({embeds: [embed_2]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

    try {
      client.distube.play(VoiceChannel, music, { textChannel: message.channel, member: message.member});
    } catch (e) {
      const embed = new MessageEmbed()
      .setDescription(`:x: | Error: ${message.guild.me.voice.channelId}!`)
      .setColor("RANDOM");
      message.reply({embeds: [embed]}).catch((e) => {
        message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

        });
    });
    };
  },
};

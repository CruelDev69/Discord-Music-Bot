const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "stop",
  description: "Stops the song.",
  aliases: [],

  run: async(client, message, args) =>  {
    const VoiceChannel = message.member.voice.channel;
    const queue = await client.distube.getQueue(VoiceChannel);
    let embed_1 = new MessageEmbed()
    .setDescription(':x: | You have to be in a voice channel in order to listen music.')
    .setColor('RANDOM');
    if(!VoiceChannel) return message.reply({embeds: [embed_1]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

    let embed_2 = new MessageEmbed()
    .setDescription("✅ | Stopped the song.")
    .setColor('RANDOM');

    try {
      if(!queue || !queue.songs || queue.songs.length == 0) return message.reply(":x: | I am not playing anything.").catch((e) => {
        message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

        });
    });
        queue.stop(VoiceChannel)
      return message.reply({embeds: [embed_2]}).catch((e) => {
        message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

        });
    });
    } catch (e) {
      const embed = new MessageEmbed()
      .setDescription(`:x: | Error: ${message.guild.me.voice.channelId}!`)
      .setColor("RANDOM");
      message.reply({embeds: [embed]}).catch((e) => {
        message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

        });
    });
      console.log(e);
    };
  },
};
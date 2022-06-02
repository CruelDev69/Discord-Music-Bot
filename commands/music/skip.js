const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "skip",
  description: "Skips the song.",
  aliases: [],

  run: async(client, message, args) =>  {
   try {
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
    .setDescription("✅ | Skipped the song.")
    .setColor('RANDOM');

      if(!queue || !queue.songs || queue.songs.length == 0) return message.reply(":x: | I am not playing anything.");
        await queue.skip(VoiceChannel);
        message.reply({embeds: [embed_2]}).catch((e) => {
          message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

          });
      });
    } catch (err) {
      let embed_3 = new MessageEmbed()
      .setDescription(`✅ | Can't skip song because there is no next song in the queue.`)
      .setColor('RANDOM');
        message.reply({ embeds: [embed_3]}).catch((e) => {
          message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

          });
      });
        console.log(err);
      };
  },
};
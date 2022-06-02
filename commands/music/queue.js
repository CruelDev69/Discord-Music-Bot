const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "queue",
  description: "Shows queue in the server.",
  aliases: ["q"],

  run: async(client, message, args) =>  {

    const VoiceChannel = message.member.voice.channel;
    const queue = await client.distube.getQueue(VoiceChannel);


    let embed_2 = new MessageEmbed()
    .setDescription(`${queue.songs.map(
        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
    )}`)
    .setColor('RANDOM');

    if (queue) {
        message.reply({embeds: [embed_2]}).catch((e) => {
          message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

          });
      });
      };
      if(!queue || !queue.songs || queue.songs.length == 0) return message.reply(":x: | I am not playing anything.").catch((e) => {
        message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

        });
    });

  },
};
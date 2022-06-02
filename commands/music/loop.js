const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "loop",
  description: "Toggle loop.",
  aliases: ["l"],

  run: async(client, message, args) =>  {

    const VoiceChannel = message.member.voice.channel;
    const queue = await client.distube.getQueue(VoiceChannel);
    let embed_1 = new MessageEmbed()
    .setDescription(':x: | You have be in a voice channel in order to listen music.')
    .setColor('RANDOM');
    if(!VoiceChannel) return message.reply({embeds: [embed_1]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

    let Mode = await client.distube.setRepeatMode(queue);

    let embed_2 = new MessageEmbed()
    .setDescription(`✅ | Loop mode set to **${Mode ? Mode == 2 ? "All Queue" : "This Song" : "Off"}**.`)
    .setColor('RANDOM');

    try {
      if(!queue || !queue.songs || queue.songs.length == 0) return message.reply(":x: | I am not playing anything.");
      message.reply({embeds: [embed_2]}).catch((e) => {
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
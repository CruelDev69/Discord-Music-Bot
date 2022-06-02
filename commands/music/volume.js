const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "volume",
  description: "Sets song's volume",
  aliases: [],

  run: async(client, message, args) =>  {
    const VoiceChannel = message.member.voice.channel;
    const Volume = Number(args[0])

    let embed_1 = new MessageEmbed()
    .setDescription(':x: | You have to be in a voice channel in order to listen music.')
    .setColor('RANDOM');
    if(!VoiceChannel) return message.reply({embeds: [embed_1]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

    let embed_2 = new MessageEmbed()
    .setDescription(`✅ | Set volume to ${Volume}%`)
    .setColor('RANDOM');

    try {
        if(Volume > 100 || Volume < 1) return message.reply(":x: | Choose between 0 to 100");
      client.distube.setVolume(VoiceChannel, Volume)
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
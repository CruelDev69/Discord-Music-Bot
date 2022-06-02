const { joinVoiceChannel } = require("@discordjs/voice");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "join",
  description: "Joins the voice channel.",
  aliases: [],

  run: async(client, message, args) =>  {

    let user = await message.member.fetch();
    let channel = await user.voice.channel;
if(!channel) return message.reply(":x: | You have to be in a Voice Channel in order to use this command.").catch((e) => {
  message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

  });
});
    joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });
    let embed = new MessageEmbed()
    .setDescription("✅ | Joined voice channel.");
    message.reply({embeds: [embed]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });
  },
};
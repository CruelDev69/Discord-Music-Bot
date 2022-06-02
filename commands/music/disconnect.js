const { getVoiceConnection } = require("@discordjs/voice");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "disconnect",
  aliases: ["leave", "dc"],
  description: "Leaves the voice channel.",

  run: async(client, interaction, args) =>  {
    const connection = getVoiceConnection(interaction.guild.id);

    if(!connection) return message.reply(":x: | I'm not in a voice channel!").catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

    let embed = new MessageEmbed()
    .setDescription("✅ | Left voice channel.");

    connection.destroy();
    message.reply({embeds: [embed]}).catch((e) => {
      message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

      });
  });

},
};
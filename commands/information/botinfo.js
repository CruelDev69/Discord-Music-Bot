const { version: djsversion, MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "botinfo",
    aliases: ["info"],
    description: "Shows Bot's information",

    run: async (client, message, args) => {
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
          let totalSeconds = (client.uptime / 1000);
          let days = Math.floor(totalSeconds / 86400);
          totalSeconds %= 86400;
          let hours = Math.floor(totalSeconds / 3600);
          totalSeconds %= 3600;
          let minutes = Math.floor(totalSeconds / 60);
          let seconds = Math.floor(totalSeconds % 60);
          let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
            
        const embed = new MessageEmbed()
        .setColor('#8112df')
        .setTitle(`${client.user.username}'s Information`)
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`🤖・${client.user.username}'s Tag:`, client.user.tag)
        .addField(`🤖・${client.user.username}'s ID:`, client.user.id)
        .addField("🤖・Node.js:", process.version)
        .addField("🤖・Discord.js:", `v${djsversion}`)
        .addField("🤖・Uptime:", uptime)
        .addField("🤖・Commands Count:", `${client.commands.size}`)
        .addField("🤖・Servers Count:", numberWithCommas(client.guilds.cache.size))
        .addField("🤖・Users Count:", numberWithCommas(client.guilds.cache.reduce((a,b) => a + b.memberCount, 0)))
        .addField("🤖・Created at:", `${moment(client.user.createdTimestamp).format('LT')} ${moment(client.user.createdTimestamp).format('LL')} - (${moment(client.user.createdTimestamp).fromNow()})`)
        .addField("🤖・Website:", "[Vivre.cf](https://www.vivre.cf/)")
        .addField("🤖・About Developer", "This Script is made with ♥ by [Ahad#3257](https://www.itscruel.cf)")
        .addField("🤖・Bots by Ahad#3257", "[Vivre](https://www.vivre.cf/invite)\n[Vivre Music](https://www.vivre.cf/pages/vivre-music/invite)")
        .addField("🤖・Server by Ahad#3257", "[Ahad's Lounge](https://discord.gg/Ncsc5pRNgf)\n[ΣXΣ' ΩFFICIΔL](https://discord.gg/6cqx6M9Yu3)")
        .setFooter({
            text: `Requested by ${message.author.username}`}
            )
        .setTimestamp();

        message.reply({ embeds: [embed] }).catch((e) => {
            message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

            });
        });
    },
};

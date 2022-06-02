const { Client, Collection, Intents, MessageEmbed } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.config = require("./config.json");
// Requiring project
require("./handler")(client);

// Requiring DisTube Package and Plugins
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require("@distube/spotify");

// Setting up DisTube
client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    youtubeDL: false,
    plugins: [new YtDlpPlugin(), new SpotifyPlugin()],
});
module.exports = client;

// Events

// Ready Event You can Change Your Bot's Status From here
client.on("ready", async () => {
    console.log(`${client.user.tag} is now online ok?`);
    console.log("A music bot made with ♥ by Ahad#3257");
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 
        let serverIn = numberWithCommas(client.guilds.cache.size);
        let totalMembers = numberWithCommas(client.guilds.cache.reduce((a,b) => a + b.memberCount, 0));

        client.user?.setPresence({
            status: "idle", // You can also use online, invisible and dnd.
            activities: [
                {
                    name: `${client.config.prefix}help || ${totalMembers} users in ${serverIn} servers`,
                    type: "LISTENING" // You can also use PLAYING, STREAMING, WATCHING and COMPETING.
                }
            ]
        })
});

// Message Event + Command Handler Don't Touch this.
client.on("messageCreate", async (message) => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.member)
      message.member = await message.guild.fetchMember(message);
  
    if (!message.content.startsWith(client.config.prefix)) return;
  
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(" ");
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  
    if (!command) return;
    if (command) {
      command.run(client, message, args);
    }
  });

// Interaction Event
client.on("interactionCreate", async (interaction) => {

    //Select Menu Handling
    if (interaction.isSelectMenu()) {
        await interaction.deferUpdate();
    };
});

// DisTube Events
client.distube
.on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setDescription(`📀 | Playing: [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
  .setFooter(`Requested by ${song.user.username} | Bot by Ahad#3257`, `${song.user.displayAvatarURL()}`)
  .setTimestamp()
  .setColor("RANDOM")]}))
.on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setDescription(`📀 | Added [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
  .setFooter(`Requested by ${song.user.username} | Bot by Ahad#3257`, `${song.user.displayAvatarURL()}`)
  .setTimestamp()
  .setColor("RANDOM")]}))
.on("playList", (queue, playlist, song) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setDescription(`📀 | Play [${playlist.name}](${playlist.url}) playlist (${playlist.songs.length} songs).\nNow playing [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
  .setFooter(`Requested by ${song.user.username} | Bot by Ahad#3257`, `${song.user.displayAvatarURL()}`)
  .setTimestamp()
  .setColor("RANDOM")]}))
.on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setDescription(`📀 | Added [${playlist.name}](${playlist.url}) playlist (${playlist.songs.length} songs) to queue.`)
  .setColor("RANDOM")]}))
.on("empty", (queue) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setDescription(`📀 | Looks like everyone left me alone in the Voice Channel so I am leaving Voice Channel too.`)
  .setColor("RANDOM")]}))
.on(`error`, (channel, e) => {
    channel.send({embeds: [new MessageEmbed()
    .setDescription(`:x: | An error encountered: ${e}`)
  .setColor('RANDOM')]})}) 
.on("finish", (queue) => queue.textChannel.send({embeds: [new MessageEmbed()
.setDescription(`📀 | Music Queue has just ended`)
.setColor("RANDOM")]}));

// Logging in
client.login(client.config.token);
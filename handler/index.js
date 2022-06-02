const fs = require("fs")

module.exports = async (client) => {

    // Commands
    client.on("messageCreate", async message => {
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.member)
         message.member = await message.guild.fetchMember(message);
          
        if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
              return message.channel.send(`My Prefix is **${client.config.prefix}**`);
            }
          })
          
          // If you want to add more folders of commands name them below
          let modules = ["information", "music"];
          
          modules.forEach(function(module) {
            fs.readdir(`./commands/${module}`, function(err, files) {
              if (err)
                return new Error(
                  "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
                );
              files.forEach(function(file) {
                if (!file.endsWith(".js")) return;
                let command = require(`../commands/${module}/${file}`);
                if (command.name) client.commands.set(command.name, command);
                if (command.aliases) {
                  command.aliases.forEach(alias =>
                    client.aliases.set(alias, command.name)
                  );
                }
                if (command.aliases.length === 0) command.aliases = null;
              });
            });
          });
};
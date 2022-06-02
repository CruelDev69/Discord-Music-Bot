module.exports = {
    name: "ping",
    description: "Shows Vivre's Ping",
    aliases: [],

    run: async (client, message, args) => {
        message.reply({ content: `${client.ws.ping}ms!` }).catch((e) => {
            message.author.send(":x: | I don't have `SEND_MESSAGES` permission.").catch((e) => {

            });
        });
    },
};

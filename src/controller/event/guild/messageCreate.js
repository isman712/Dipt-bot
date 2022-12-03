const Discord = require("discord.js");

//let prefixes = require(`../../../database/schema/prefix.js`)

const { prefixDefaul } = require("../../../config/config.js")
module.exports = async (client, message) => {

 //const modelo = await prefixes.findOne({ server: message.guildId });
const prefix =prefixDefaul //modelo ? modelo.prefix : prefixDefaul;
    if(!message.guild || !message.channel || message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if(command) {
        //ejecutar el comando
        command.run(client, message, args, prefix)
    } else {

        return 
    }

}

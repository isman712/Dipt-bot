const Discord = require("discord.js");
const mongoose = require("mongoose");
const { Client, Collection } = require("discord.js");

const fs = require('fs');
let { readdirSync } = require('fs');

const { prefixDefaul, token, intents} = require("./config/config.js");

const client = new Client({ intents });

require("./database/conectar.js")

client.commands = new Collection();
client.aliases = new Collection();

function requerirhandlers(){
  ["command", "events"].forEach(handler => {
      try {
          require(`${__dirname}/controller/handlers/${handler}`)(client, Discord)
      } catch(e){
          console.warn(e)
      }
  })
}
requerirhandlers();

client.login(token)
  .then(() => { 
   console.info(`Estoy listo, ${client.user.tag}`);
   
 })
 .catch((err) => {
   console.error("Error al iniciar sesión: " + err);

 });
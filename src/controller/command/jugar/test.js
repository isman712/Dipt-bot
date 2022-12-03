const Discord = require("discord.js");

let jugadorData = require('../../../database/esquemas/jugador.js')
const { X, S, C } = require("../../../config/emojis.js")
const { ColoEmbed, Footer } = require("../../../config/config.js")
const  itens  = require("../../../recursos/DataJuego/itens.js");

module.exports = {
    name: "test",
    aliases: ["test"],
    desc: "",
    run: async (client, message, args, prefix) => {

        const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id })
      //  const user = await jugadorData.findOne({ userID });
     //   if(!DataBaseUwu.Invebtario.forEach(element => element.id) === "5") return console.log("Osla")

   

const ItensUwU = "2";

 DataBaseUwu.Inventario.find(e => e.id == ItensUwU).Cantidad = "3";


 await jugadorData.updateOne({
    UserID: message.author.id,
    'Inventario.id': ItensUwU
  }, { $set: {
    'Inventario.$.Cantidad': '10'
  }});


    }}
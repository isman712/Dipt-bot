const Discord = require("discord.js");

let jugadorData = require('../../../database/esquemas/jugador.js')
const { X, S, C } = require("../../../config/emojis.js")
const { ColoEmbed, Footer } = require("../../../config/config.js")

module.exports = {
    name: "tarjeta",
    aliases: ["jinfo"],
    desc: "",
    run: async (client, message, args, prefix) => {

        const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()

        if(!DataBaseUwu) return message.channel.send({content: X+"** | No has creado un personaje aun, crea uno con el comando: "+prefix+"iniciar**"})
        
        const embed1 = new Discord.MessageEmbed()

        .setTitle("Tarjeta de personaje")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addField("Nombre:", message.author.tag,true)
        .addField("Raza:", `${DataBaseUwu.Propiedades[0].Raza}`,true)
        .addField("Clase:", `${DataBaseUwu.Propiedades[0].Clase}`,true)
        .addField("Nivel:", `${DataBaseUwu.Propiedades[0].Nivel}`,true)
        .addField("Dinero:", `${DataBaseUwu.Propiedades[0].Dinero}`,true)
        .addField("Ubicacion", `${DataBaseUwu.Propiedades[0].Ubicacion}`, true)
        .addField("Número de muertes:", `${DataBaseUwu.Propiedades[0].NumeroDeMuertes}`,true)
        .addField("Número de asesinatos:", `${DataBaseUwu.Propiedades[0].NumeroDeAsesinatos}`,true)
        .addField("Estadísticas", "Las estadísticas/puntos en cada aspecto de tu personaje")
        .addField("Hp:", `${DataBaseUwu.Estadisticas[0].Hp}`,true)
        .addField("Mana:", `${DataBaseUwu.Estadisticas[0].Mana}`,true)
        .addField("Fuerza:", `${DataBaseUwu.Estadisticas[0].Fuerza}`,true)
        .addField("Agilidad:", `${DataBaseUwu.Estadisticas[0].Agilidad}`)
        .addField("Velocidad:", `${DataBaseUwu.Estadisticas[0].Velocidad}`,true)
        .addField("Resistencia:", `${DataBaseUwu.Estadisticas[0].Resistencia}`,true)
        .setColor(ColoEmbed)
        .setFooter(Footer)
const m = await message.channel.send({embeds:[embed1]})
    }}
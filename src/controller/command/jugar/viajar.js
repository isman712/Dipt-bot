const Discord = require("discord.js");

let jugadorData = require('../../../database/esquemas/jugador.js')
const { X, S, C } = require("../../../config/emojis.js")
const { ColoEmbed, Footer } = require("../../../config/config.js")

const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const ms = require('ms');
const PeteZonas = require("../../../recursos/DataJuego/zonas.js")

module.exports = {
    name: "viajar",
    aliases: ["explorar"],
    desc: "",
    run: async (client, message, args, prefix) => {

        const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()

        if(!DataBaseUwu) return message.channel.send({content: X+"** | No has creado un personaje aun, crea uno con el comando: "+prefix+"iniciar**"})


        const earnCashCommandCooldown = new CommandCooldown('earnCash', ms('5m'));

        const userCooldowned = await earnCashCommandCooldown.getUser(message.author.id); 
        if(userCooldowned){
            const timeLeft = msToMinutes(userCooldowned.msLeft, false); 
            message.channel.send({content: X + `** | ¡Debe esperar ${ timeLeft.hours + ' horas, ' + timeLeft.minutes + ' minutos, ' + timeLeft.seconds + ' segundos '} antes de volver a ejecutar el comando!**`});
        }else{

        let DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()

        let botones1 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("SECONDARY").setLabel(PeteZonas[0].Nombre).setCustomId("bp1"),
            new Discord.MessageButton().setStyle("SECONDARY").setLabel(PeteZonas[1].Nombre).setCustomId("bp2"),
            new Discord.MessageButton().setStyle("SECONDARY").setLabel(PeteZonas[2].Nombre).setCustomId("bp3"),

        ])

        const embed1 = new Discord.MessageEmbed()
        .setTitle("✈ | Seleccione la ubicación donde desea viajar")
        .addField(PeteZonas[0].Nombre, "Costo: $"+PeteZonas[0].CostoViaje)
        .addField(PeteZonas[1].Nombre, "Costo: $"+PeteZonas[1].CostoViaje)
        .addField(PeteZonas[2].Nombre, "Costo: $"+PeteZonas[2].CostoViaje)
        .addField(PeteZonas[3].Nombre, "Costo: $"+PeteZonas[3].CostoViaje)
        .addField(PeteZonas[4].Nombre, "Costo: $"+PeteZonas[4].CostoViaje)
        .setColor(ColoEmbed)
        .setFooter(Footer)

        const m = await message.channel.send({embeds:[embed1], components: [botones1]})

        const ilfilter = i => i.user.id === message.author.id
    const collector = m.createMessageComponentCollector({filter: ilfilter, time: 60000})

    collector.on("collect", async i => {
            
        if(i.customId === "bp1"){
            await i.deferUpdate()

            let DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
            if(DataBaseUwu.Propiedades[0].Ubicacion === PeteZonas[0].Nombre)  return   message.channel.send({content: X+"** | Ya estas en esa ubicación**"})

            if(DataBaseUwu.Propiedades[0].Dinero >= PeteZonas[0].CostoViaje){
                i.editReply({content: S+"** | Has viajado con éxito a "+PeteZonas[0].Nombre+", se te descontaron $"+PeteZonas[0].CostoViaje+" por el viaje**", components: [], embeds: []})
                const Propiedades = [{Nivel: DataBaseUwu.Propiedades[0].Nivel, NumeroDeMuertes: DataBaseUwu.Propiedades[0].NumeroDeMuertes, NumeroDeAsesinatos: DataBaseUwu.Propiedades[0].NumeroDeAsesinatos, Dinero: new Number(DataBaseUwu.Propiedades[0].Dinero) - 15, Raza: DataBaseUwu.Propiedades[0].Raza, Clase: DataBaseUwu.Propiedades[0].Clase, Ubicacion: PeteZonas[0].Nombre}]
                await DataBaseUwu.updateOne({  Propiedades: Propiedades})
            } else {
                message.channel.send({content: X+"** | No tienes el dinero suficiente para viajar a "+PeteZonas[0].Nombre+"**"})

            }

  
     }
     if(i.customId === "bp2"){
        await i.deferUpdate()

        let DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
        if(DataBaseUwu.Propiedades[0].Ubicacion === PeteZonas[1].Nombre)  return   message.channel.send({content: X+"** | Ya estas en esa ubicación**"})

        if(DataBaseUwu.Propiedades[0].Dinero >= PeteZonas[1].CostoViaje){
            i.editReply({content: S+"** | Has viajado con éxito a "+PeteZonas[1].Nombre+", se te descontaron $"+PeteZonas[1].CostoViaje+" por el viaje**", components: [], embeds: []})
            const Propiedades = [{Nivel: DataBaseUwu.Propiedades[0].Nivel, NumeroDeMuertes: DataBaseUwu.Propiedades[0].NumeroDeMuertes, NumeroDeAsesinatos: DataBaseUwu.Propiedades[0].NumeroDeAsesinatos, Dinero: new Number(DataBaseUwu.Propiedades[0].Dinero) - 80, Raza: DataBaseUwu.Propiedades[0].Raza, Clase: DataBaseUwu.Propiedades[0].Clase, Ubicacion: PeteZonas[1].Nombre}]
            await DataBaseUwu.updateOne({  Propiedades: Propiedades})
        } else {
            message.channel.send({content: X+"** | No tienes el dinero suficiente para viajar a "+PeteZonas[1].Nombre+"**"})

        }


 }
 if(i.customId === "bp3"){
    await i.deferUpdate()

    let DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
    if(DataBaseUwu.Propiedades[0].Ubicacion === PeteZonas[2].Nombre)  return   message.channel.send({content: X+"** | Ya estas en esa ubicación**"})

    if(DataBaseUwu.Propiedades[0].Dinero >= PeteZonas[2].CostoViaje){
        i.editReply({content: S+"** | Has viajado con éxito a "+PeteZonas[2].Nombre+", se te descontaron $"+PeteZonas[2].CostoViaje+" por el viaje**", components: [], embeds: []})
        const Propiedades = [{Nivel: DataBaseUwu.Propiedades[0].Nivel, NumeroDeMuertes: DataBaseUwu.Propiedades[0].NumeroDeMuertes, NumeroDeAsesinatos: DataBaseUwu.Propiedades[0].NumeroDeAsesinatos, Dinero: new Number(DataBaseUwu.Propiedades[0].Dinero) - 200, Raza: DataBaseUwu.Propiedades[0].Raza, Clase: DataBaseUwu.Propiedades[0].Clase, Ubicacion: PeteZonas[2].Nombre}]
        await DataBaseUwu.updateOne({  Propiedades: Propiedades})
    } else {
        message.channel.send({content: X+"** | No tienes el dinero suficiente para viajar a "+PeteZonas[2].Nombre+"**"})

    }


}
    })

   await earnCashCommandCooldown.addUser(message.author.id); 
        }
    }}
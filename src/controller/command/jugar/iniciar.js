const Discord = require("discord.js");

let jugadorData = require('../../../database/esquemas/jugador.js')
const { X, S, C } = require("../../../config/emojis.js")
const { ColoEmbed, Footer } = require("../../../config/config.js")
const PeteRazas = require("../../../recursos/DataJuego/razas.js")

module.exports = {
    name: "iniciar",
    aliases: ["comenzar"],
    desc: "",
    run: async (client, message, args, prefix) => {

        const Humano = [{
            Fuerza: PeteRazas[0].Fuerza,
            Velocidad: PeteRazas[0].Velocidad,
            Agilidad: PeteRazas[0].Agilidad,
            Resistencia: PeteRazas[0].Resistencia,
            Mana: PeteRazas[0].Mana,
            Hp: PeteRazas[0].Hp,
        }]
        const Demonio = [{
            Fuerza: PeteRazas[1].Fuerza,
            Velocidad: PeteRazas[1].Velocidad,
            Agilidad: PeteRazas[1].Agilidad,
            Resistencia: PeteRazas[1].Resistencia,
            Mana: PeteRazas[1].Mana,
            Hp: PeteRazas[1].Hp,
        }]
        const Elfo = [{
            Fuerza: PeteRazas[2].Fuerza,
            Velocidad: PeteRazas[2].Velocidad,
            Agilidad: PeteRazas[2].Agilidad,
            Resistencia: PeteRazas[2].Resistencia,
            Mana: PeteRazas[2].Mana,
            Hp: PeteRazas[2].Hp,
        }]

        let DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
       
        if(DataBaseUwu){
            return message.channel.send({content: X+" **| Ya tienes creado un personaje, usa `"+ prefix+"tarjeta` para ver la información de tu personaje**"})
        } else {
        

        let botones1 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Iniciar").setEmoji(S).setCustomId("b1"),
               
        ])
        let botones2 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Humano").setCustomId("bs1"),
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Demonio").setCustomId("bs2"),
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Elfo").setCustomId("bs3"),
        ])
        let botones3 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Mago").setCustomId("bt1"),
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Espadachín").setCustomId("bt2"),
            new Discord.MessageButton().setStyle("PRIMARY").setLabel("Asesino").setCustomId("bt3"),
        ])
        let botones4 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("SUCCESS").setLabel("Finalizar").setEmoji(S).setCustomId("bc1"),
               
        ])
     

       const embed1 = new Discord.MessageEmbed()
        .setTitle("🔧 | ¡Iniciaremos con la creación de su personaje!")
        .setDescription("A continuación crearemos su personaje, podrá seleccionar su raza, su clase y más.\n\n¿Listo para iniciar tu aventura?")
        .setColor(ColoEmbed)
        .setFooter(Footer)

       const embed2 = new Discord.MessageEmbed()
       .setTitle("🔧 | Selecciona la raza de su personaje")
       .addField("Humano","Fuerza: 8\nVelocidad: 6\nAgilidad: 6\nResistencia: 8\nMana: 20\nHp: 20")
       .addField("Demonio","Fuerza: 12\nVelocidad: 8\nAgilidad: 5\nResistencia: 10\nMana: 15\nHp:25")
       .addField("Elfo","Fuerza: 9\nVelocidad: 13\nAgilidad: 15\nResistencia: 5\nMana: 10\nHp:23")
       .setColor(ColoEmbed)
       .setFooter(Footer)
 
       const embed3 = new Discord.MessageEmbed()
        .setTitle("🔧 | Selecciona la clase de su personaje")
        .addField("Mago", "+10 puntos en mana\n+3 puntos en velocidad")
        .addField("Espadachín", "+5 puntos en velocidad\n+5 puntos en agilidad\n+8 puntos en fuerza\n+2 puntos en resistencia")
        .addField("Asesino", "+10 puntos en velocidad\n+12 puntos en agilidad\n+2 puntos en fuerza")
        .setColor(ColoEmbed)
        .setFooter(Footer)

        const embed4 = new Discord.MessageEmbed()
         .setTitle(S+" | ¡En hora buena ha finalizado la creación de su personaje!")
         .setDescription("Dele al botón finalizar para ver la información de su personaje")
         .setColor(ColoEmbed)
         .setFooter(Footer)

        
    const m = await message.channel.send({embeds:[embed1], components: [botones1]})

    const ilfilter = i => i.user.id === message.author.id
    const collector = m.createMessageComponentCollector({filter: ilfilter, time: 60000})

    collector.on("collect", async i => {
        if(i.customId === "b1"){
            await i.deferUpdate()
            i.editReply({embeds: [embed2], components:[botones2]})
        }
        if(i.customId === "bs1"){
            await i.deferUpdate()
            i.editReply({embeds: [embed3], components:[botones3]})
            const Propiedades = [{Nivel: "0", NumeroDeMuertes: "0", NumeroDeAsesinatos: "0", Dinero: "0", Raza: "Humano", Clase: null, Ubicacion: "Pueblo: wids"}]
            let GDTH = new jugadorData({ ServerID: message.guild.id, UserID: message.author.id, Estadisticas: Humano[0], Propiedades: Propiedades })
            await GDTH.save()

        }
        if(i.customId === "bs2"){
            await i.deferUpdate()
            i.editReply({embeds: [embed3], components:[botones3]})
            const Propiedades = [{Nivel: "0", NumeroDeMuertes: "0", NumeroDeAsesinatos: "0", Dinero: "0", Raza: "Demonio", Clase: null, Ubicacion: "Pueblo: wids"}]
            let GDTH = new jugadorData({ ServerID: message.guild.id, UserID: message.author.id, Estadisticas: Demonio[0], Propiedades: Propiedades })
            await GDTH.save()
        }
        if(i.customId === "bs3"){
            await i.deferUpdate()
            i.editReply({embeds: [embed3], components:[botones3]})
            const Propiedades = [{Nivel: "0", NumeroDeMuertes: "0", NumeroDeAsesinatos: "0", Dinero: "0", Raza: "Elfo", Clase: null, Ubicacion: "Pueblo: wids"}]
            let GDTH = new jugadorData({ ServerID: message.guild.id, UserID: message.author.id, Estadisticas: Elfo[0], Propiedades: Propiedades})
            await GDTH.save()
        }
        if(i.customId === "bt1"){
            await i.deferUpdate()
            i.editReply({embeds: [embed4], components:[botones4]})
            const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
            const Propiedades = [{Nivel: DataBaseUwu.Propiedades[0].Nivel, NumeroDeMuertes: DataBaseUwu.Propiedades[0].NumeroDeMuertes, NumeroDeAsesinatos: DataBaseUwu.Propiedades[0].NumeroDeAsesinatos, Dinero: DataBaseUwu.Propiedades[0].Dinero, Raza: DataBaseUwu.Propiedades[0].Raza, Clase: "Mago", Ubicacion: DataBaseUwu.Propiedades[0].Ubicacion}]
            const DataAGuardar = [{
                Fuerza: new Number(DataBaseUwu.Estadisticas[0].Fuerza),
                Velocidad: new Number(DataBaseUwu.Estadisticas[0].Velocidad) +3,
                Agilidad: new Number(DataBaseUwu.Estadisticas[0].Agilidad),
                Resistencia: new Number(DataBaseUwu.Estadisticas[0].Resistencia),
                Mana: new Number(DataBaseUwu.Estadisticas[0].Mana) +10,
                Hp: new Number(DataBaseUwu.Estadisticas[0].Hp)
            }]

       await DataBaseUwu.updateOne({ Estadisticas:  DataAGuardar, Propiedades: Propiedades})


        }
        if(i.customId === "bt2"){
            await i.deferUpdate()
            i.editReply({embeds: [embed4], components:[botones4]})
            const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
            const Propiedades = [{Nivel: DataBaseUwu.Propiedades[0].Nivel, NumeroDeMuertes: DataBaseUwu.Propiedades[0].NumeroDeMuertes, NumeroDeAsesinatos: DataBaseUwu.Propiedades[0].NumeroDeAsesinatos, Dinero: DataBaseUwu.Propiedades[0].Dinero, Raza: DataBaseUwu.Propiedades[0].Raza, Clase: "Espadachín", Ubicacion: DataBaseUwu.Propiedades[0].Ubicacion}]
            const DataAGuardar = [{
                Fuerza: new Number(DataBaseUwu.Estadisticas[0].Fuerza) +8,
                Velocidad: new Number(DataBaseUwu.Estadisticas[0].Velocidad) +5,
                Agilidad: new Number(DataBaseUwu.Estadisticas[0].Agilidad) +5,
                Resistencia: new Number(DataBaseUwu.Estadisticas[0].Resistencia) +2,
                Mana: new Number(DataBaseUwu.Estadisticas[0].Mana),
                Hp: new Number(DataBaseUwu.Estadisticas[0].Hp)
            }]

       await DataBaseUwu.updateOne({ Estadisticas:  DataAGuardar, Propiedades: Propiedades})

        }
        if(i.customId === "bt3"){
            await i.deferUpdate()
            i.editReply({embeds: [embed4], components:[botones4]})
            const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
            const Propiedades = [{Nivel: DataBaseUwu.Propiedades[0].Nivel, NumeroDeMuertes: DataBaseUwu.Propiedades[0].NumeroDeMuertes, NumeroDeAsesinatos: DataBaseUwu.Propiedades[0].NumeroDeAsesinatos, Dinero: DataBaseUwu.Propiedades[0].Dinero, Raza: DataBaseUwu.Propiedades[0].Raza, Clase: "Asesino", Ubicacion: DataBaseUwu.Propiedades[0].Ubicacion}]
            const DataAGuardar = [{
                Fuerza: new Number(DataBaseUwu.Estadisticas[0].Fuerza) +2,
                Velocidad: new Number(DataBaseUwu.Estadisticas[0].Velocidad) +10,
                Agilidad: new Number(DataBaseUwu.Estadisticas[0].Agilidad) +12,
                Resistencia: new Number(DataBaseUwu.Estadisticas[0].Resistencia),
                Mana: new Number(DataBaseUwu.Estadisticas[0].Mana),
                Hp: new Number(DataBaseUwu.Estadisticas[0].Hp)
            }]

       await DataBaseUwu.updateOne({ Estadisticas:  DataAGuardar, Propiedades: Propiedades})

        }
        if(i.customId === "bc1"){
            await i.deferUpdate()

            const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
            const embed5 = new Discord.MessageEmbed()
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

            
            i.editReply({embeds: [embed5], components: []})

        }}
    )
   }
}}
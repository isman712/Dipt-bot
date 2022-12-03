const Discord = require("discord.js");

let jugadorData = require('../../../database/esquemas/jugador.js')
const { X, S, C } = require("../../../config/emojis.js")
const { ColoEmbed, Footer } = require("../../../config/config.js")
const  itens  = require("../../../recursos/DataJuego/itens.js")



module.exports = {
    name: "tienda",
    aliases: ["comprar"],
    desc: "",
    run: async (client, message, args, prefix) => {

        const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()

        if(!DataBaseUwu) return message.channel.send({content: X+"** | No has creado un personaje aun, crea uno con el comando: "+prefix+"iniciar**"})


        let botones1 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("SUCCESS").setEmoji("📥").setLabel("Comprar").setCustomId("vb1"),
            new Discord.MessageButton().setStyle("DANGER").setEmoji("📤").setLabel("Vender").setCustomId("vb2"),

        ])

        let botones2 = new Discord.MessageActionRow().addComponents([
      
            new Discord.MessageButton().setStyle("SUCCESS").setEmoji("📥").setLabel("1").setCustomId("vbb1"),
            new Discord.MessageButton().setStyle("SUCCESS").setEmoji("📥").setLabel("10").setCustomId("vbb2"),
            new Discord.MessageButton().setStyle("SUCCESS").setEmoji("📥").setLabel("30").setCustomId("vbb3"),
            new Discord.MessageButton().setStyle("SUCCESS").setEmoji("📥").setLabel("50").setCustomId("vbb4"),

        ])

        

        const IdArticulo = args[0]

        if(!IdArticulo){
            
            const embed1 = new Discord.MessageEmbed()
            .setTitle("🏪 | Tienda")
            .setColor(ColoEmbed)
            .setFooter(Footer)
            .addField(itens[0].Nombre, itens[0].Descripcion+"\nID: "+itens[0].id)
    
            const m = await message.channel.send({embeds:[embed1], components: []})
        } else {

        

        if(!itens.find(e => e.id === IdArticulo)) {return message.channel.send({content: X+ "  ** | Id de articulo no valida**"})}
        
        const ItensUwU = itens.find(e => e.id === IdArticulo)
        


        const embed2 = new Discord.MessageEmbed()
        .setTitle("🏪 | Tienda ➸ "+ `${ItensUwU.Nombre}`)
        .setDescription(`${ItensUwU.Descripcion}`)
        .addField("📝 Nombre: ", `${ItensUwU.Nombre}`)
        .addField("📂 Id:", `${ItensUwU.id}`, true)
        .addField("💸 Precio de compra:", `$${ItensUwU.PrecioCompra}`)
        .addField("💰 Precio de venta: ",`$${ItensUwU.PrecioVenta}`)
        .setColor(ColoEmbed)
        .setFooter(Footer)

        const m = await message.channel.send({embeds:[embed2], components: [botones1]})



        
        
        const ilfilter = i => i.user.id === message.author.id
        const collector = m.createMessageComponentCollector({filter: ilfilter, time: 60000})
    
        collector.on("collect", async i => {

            if(i.customId === "vb1"){

                await i.deferUpdate()

                const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
                
                const CantidadCompra = new Discord.MessageEmbed()
                .setTitle("Cantidad a comprar")
                .setDescription("Seleccione la cantidad de artículos a comprar")
                .addField("1", `$${ItensUwU.PrecioCompra}`)
                .addField("10", `$${ItensUwU.PrecioCompra * 10}`)
                .addField("30", `$${ItensUwU.PrecioCompra * 30}`)
                .addField("50", `$${ItensUwU.PrecioCompra * 50}`)
                .setColor(ColoEmbed)
                .setFooter(Footer)

                i.editReply({embeds: [CantidadCompra], components: [botones2]})

               
            }

            if(i.customId === "vbb1"){
                await i.deferUpdate()

                const GuardarIten1 = {
                    id: ItensUwU.id,
                    Cantidad: "1"
                }


                const DataBaseUwu = await jugadorData.findOne({ UserID: message.author.id }).exec()
        
                const OWO = DataBaseUwu.Inventario.map(x => x.id)

                if(!OWO.includes(ItensUwU.id)){
                    await DataBaseUwu.updateOne({ $push: {Inventario: GuardarIten1}})
                } else {
                    const OwOIten = DataBaseUwu.Inventario.findIndex(e => e.id === ItensUwU.id)
                    const UwUIten = DataBaseUwu.Inventario.find(e => e.id === ItensUwU.id)
                    
                    const GuardarIten2 = {
                        id: ItensUwU.id,
                        Cantidad: UwUIten.Cantidad + 1
                    }

                    await jugadorData.updateOne({
                        UserID: message.author.id,
                        'Inventario.id': ItensUwU
                      }, { $set: {
                        'Inventario.$.Cantidad': '10'
                      }});
                }
                

            }
        })
    }
    }}


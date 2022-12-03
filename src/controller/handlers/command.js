const fs = require('fs');
let { readdirSync } = require('fs'); 
module.exports = (client) => {

  
    try {

        let comandos = 0;
        fs.readdirSync("./src/controller/command/").forEach((carpeta) => {
            const commands = fs.readdirSync(`./src/controller/command/${carpeta}`).filter((archivo) => archivo.endsWith(".js"));
            for (let archivo of commands){
                let comando = require(`../command/${carpeta}/${archivo}`);
                if(comando.name) {
                    client.commands.set(comando.name, comando);
                    comandos++
                } else {
                    console.log(`COMANDO [/${carpeta}/${archivo}]`, `error => el comando no está configurado`.brightRed)
                    continue;
                }
                if(comando.aliases && Array.isArray(comando.aliases)) comando.aliases.forEach((alias) => client.aliases.set(alias, comando.name));
            }
        });
    } catch(e){
        console.log(e)
    }
}
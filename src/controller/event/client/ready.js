const Discord = require('discord.js');
module.exports = client => {

  const statuses =
 // [{ name: "⚠️│El bot se encuentra en mantenimiento.", type: "PLAYING"}]
[
  {
    name: `En desarrollo`,
    type: `PLAYING` 
  }
]
  
setInterval(function() {  
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {type: "PLAYING"});
}, 10000);
  
}
require('dotenv').config()

module.exports = {
    token: process.env.token,
    MongoURL: process.env.MongoURL,
    prefixDefaul: process.env.prefixDefaul,
    intents: process.env.intents,
    ColoEmbed: process.env.ColoEmbed,
    Footer: { text: "Dipt Bot | v1.0.0", iconURL: "https://drive.google.com/file/d/1b48l-tb7aDmbyOid5jBNwFKQpTwmyU5V/view?usp=sharing" }
  };
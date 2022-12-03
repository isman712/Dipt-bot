const mongoose = require("mongoose");

const { MongoURL } = require("../config/config.js")


mongoose.connect(MongoURL , {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Conectado a la base de datos!"))
.catch(err => console.error(err))



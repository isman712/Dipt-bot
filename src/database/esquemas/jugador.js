const mongoose = require('mongoose');

const jugador = new mongoose.Schema({
    ServerID: String,
    UserID: String,
    Estadisticas: {type: Array, default: []},
    Propiedades: {type: Array, default: [{Nivel: "0", NumeroDeMuertes: "0", NumeroDeAsesinatos: "0", Dinero: "0", Raza: null, Clase: null, Ubicacion: "Pueblo: wids"}]},
    Inventario: {type: Array, default: []}
})

const model = mongoose.model("jugador", jugador);

module.exports = model;

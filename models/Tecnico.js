// TECNICO SCHEMA SETUP

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var TecnicoSchema = new mongoose.Schema({
    primeiroNome: String,
    ultimoNome: String,
    password: String,
    email : String,
    contacto: String,
    sexo: String,
    salario : Number,
    funcao: String,
    updated_at: { type: Date, default: Date.now },
});
TecnicoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Tecnico", TecnicoSchema);
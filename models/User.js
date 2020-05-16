//USER SCHEMA SETUP

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    primeiroNome: String,
    ultimoNome: String,
    email: String,
    password: String,
    contacto: String,
    morada: String,
    sexo: String,
    estado: String,
    isAdmin: { type: Boolean, default: false }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
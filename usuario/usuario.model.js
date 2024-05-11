const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Este email ya esta en uso"],
  },
  nombre: { type: String, required: true },
  contraseña: { type: String, required: true },
  borrado: { type: Boolean, default:false, required: true},
});

const Model = mongoose.model("User", schemaUser);

module.exports = Model;

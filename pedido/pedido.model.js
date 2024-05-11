const mongoose = require("mongoose");

// Definición del esquema para los pedidos
const esquemaPedido = new mongoose.Schema({
    estado: { type: String, default: "En proceso" },
    fecha: { type: String, required: true },
    comprador: { type: String, required: true },
    id_comprador: { type: String, required: true, immutable: true },
    vendedor: { type: String, required: true },
    id_vendedor: { type: String, required: true, immutable: true },
    items: { type: [String], required: true },
    eliminado: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});


const ModeloPedido = mongoose.model('Pedido', esquemaPedido);

module.exports = ModeloPedido;

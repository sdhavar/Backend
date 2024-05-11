const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasProducto = require("./producto/libro.route")
app.use('/producto', rutasProducto);

const rutasUsuario = require('./usuario/usuario.route')
app.use('/usuario', rutasUsuario)

// aqui va la connection string VVVVV
mongoose.connect("mongodb+srv://sheras:SuwNfnBj5ZfjE6D8@cluster0.9idgqbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("Database connection successful")).catch(() => console.log("Database connection error"));

app.listen(8080, function() {
    console.log("Server listening on port 8080");
})
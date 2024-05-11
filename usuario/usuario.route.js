const express = require("express");
const router = express.Router();

const {
  obtenerUsuario,
  crearUsuario,
  encontrarUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesionUsuario,
} = require("../usuario/usuario.controller.js");
const ControladorAuth = require("../auth/auth.jwt.js");

async function ObtenerUsuario(req, res) {
  try {
    const token = ControladorAuth.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadosBusqueda = await obtenerUsuario(req.query);
      res.status(200).json({
        ...resultadosBusqueda,
      });
    } else {
      res.status(500).json({
        error: "Token inválido",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "No se encontraron datos" });
  }
}

async function CrearUsuario(req, res) {
  try {
    const usuario = await crearUsuario(req.body);
    const cookie = await iniciarSesionUsuario(req.body);
    res.cookie("token", cookie, { httpOnly: true });
    res.status(200).json({
      msg: "El usuario ha sido creado exitosamente"
    });
  } catch (e) {
    if (e.code == 11000){
      res.status(500).json({ msg: "Correo ya en uso"});
    }else{
    res.status(500).json({ msg: "No se pudo crear el usuario"});
    }
  }
}

async function IniciarSesionUsuario(req, res) {
  try {
    const cookie = await iniciarSesionUsuario(req.body);
    res.cookie("token", cookie, { httpOnly: true });
    res.status(200).json({ msg: "Ingreso exitoso"});
  } catch (e) {
    res.status(500).json({ msg: "No se pudo iniciar sesión" });
  }
}

async function ActualizarUsuario(req, res) {
  try {
    const token = ControladorAuth.cookiesJWT(req, res);
    const usuario = await encontrarUsuarioPorId(req.body._id);
    if (usuario !== undefined && token._id === usuario.id && token !== "Invalid") {
      actualizarUsuario(req.body);

      res.status(200).json({
        mensaje: "Éxito. 👍",
      });
    } else {
      res.status(500).json({
        mensaje: "Token o ID inválida",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function EliminarUsuario(req, res) {
  try {
    const token = ControladorAuth.cookiesJWT(req, res);
    const usuario = encontrarUsuarioPorId(req.params.id);
    if(token !== "Invalid" && token._id === usuario.id){
      eliminarUsuario(req.params.id);
      res.status(200).json({
        mensaje: "Éxito. 👍",
      });
    }else{
      res.status(200).json({
        mensaje: "Token inválido",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

router.get("/", ObtenerUsuario);
router.patch("/", ActualizarUsuario);
router.delete("/:id", EliminarUsuario);
router.post("/registrar", CrearUsuario);
router.post("/iniciar-sesion", IniciarSesionUsuario);

module.exports = router;

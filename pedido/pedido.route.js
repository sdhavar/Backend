const express = require("express");
const router = express.Router();
const {
  getFilteredOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./order.controller");
const AuthController = require("../Auth/AuthController.js");
const bookController = require("../book/book.controller.js")

async function getOrders(req, res) {
  try {
    const authToken = AuthController.cookiesJWT(req, res);
    if (authToken !== "Invalid") {
      const searchResults = await getFilteredOrders(req.query, authToken._id);
      res.status(200).json({
        ...searchResults,
      });
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function getOrderByIdHandler(req, res) {
  try {
    const authToken = AuthController.cookiesJWT(req, res);
    if (authToken !== "Invalid") {
      const result = await getOrderById(req.params.id, authToken._id);
      res.status(200).json({
        order: result
      });
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function postOrder(req, res) {
  try {
    const authToken = AuthController.cookiesJWT(req, res);
    if (authToken !== "Invalid") {
      const books = req.body.items
      try {
        const author = bookController.getBookById(books[0]).author_id
        for (let i = 1; i < books.length; i++) {
          if (bookController.getBookById(books[i]).author_id != author) {
            res.status(500).json({
              error: "Libro de diferente autor",
            });
          }
        }
      } catch (error) {
        res.status(500).json({
          error: "Libro Inexistente",
        });
      }

      await createOrder(req.body, authToken._id);
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function patchOrder(req, res) {
  try {
    const authToken = AuthController.cookiesJWT(req, res);
    const orderToChange = await getOrderById(req.params.id);
    if (
      authToken !== "Invalid" &&
      orderToChange !== undefined
    ) {
      if (authToken._id === orderToChange.buyer_id) {
        if (req.params.status !== "Cancelado") {
          updateOrder(req.params.id, req.params.status);
        } else {
          res.status(500).json({
            error: "Estado no válido",
          });
        }
      } else if (authToken._id === orderToChange.seller_id) {
        if (req.params.status !== "Cancelado" || req.params.status !== "Completado") {
          updateOrder(req.params.id, req.params.status);
        } else {
          res.status(500).json({
            error: "Estado no válido",
          });
        }
      }
      else {
        res.status(500).json({
          mensaje: "Usuario no autorizado",
        });
      }
      res.status(200).json({
        mensaje: "Exito. 👍",
      });
    }
    else {
      res.status(500).json({
        error: "Token o ID de pedido Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

router.get("/", getOrders);
router.get("/:id", getOrderByIdHandler);
router.post("/", postOrder);
router.patch("/:id/:status", patchOrder);

module.exports = router;
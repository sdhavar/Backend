const express = require("express");
const router = express.Router();
const {
  fetchFilteredBooks,
  fetchBookById,
  insertNewBook,
  updateExistingBook,
  removeExistingBook,
} = require("../producto/libro.controller.js");

const AuthController = require("../auth/auth.jwt.js");

async function getBooks(req, res) {
  try {
    const searchResults = await fetchFilteredBooks(req.query);
    res.status(200).json({
      ...searchResults,
    });
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function getBookById(req, res) {
  try {
    const foundBook = await fetchBookById(req.params.id);
    res.status(200).json({
      foundBook: foundBook
    });
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function createNewBook(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      await insertNewBook(req.body, token._id);
      res.status(200).json({
        message: "Creado con éxito. 👍",
      });
    } else {
      res.status(500).json({
        error: "Token Inválido",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function updateBookDetails(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    book = await fetchBookById(req.body._id);
    if (token !== "Invalid" && book.authorId === token._id) {
      await updateExistingBook(req.body);
      res.status(200).json({
        message: "Actualizado con éxito. 👍",
      });
    } else {
      res.status(500).json({
        message: "Token inválido",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function deleteBook(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    book = await fetchBookById(req.params.id);

    if (token !== "Invalid" && book.authorId === token._id) {
      await removeExistingBook(req.params.id);
      res.status(200).json({
        message: "Eliminado con éxito. 👍",
      });
    } else {
      res.status(500).json({
        message: "Token inválido",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createNewBook);
router.patch("/", updateBookDetails);
router.delete("/:id", deleteBook);

module.exports = router;
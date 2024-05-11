const Book = require("../producto/libro.model");

async function fetchBooksFromMongo(filters) {
  if (!filters.hasOwnProperty("deleted")) {
    filters["deleted"] = false;
  }
  const filteredBooks = await Book.find(filters, { deleted: 0, createdAt: 0, updatedAt: 0, author_id: 0 });

  return {
    results: filteredBooks,
  };
}

async function fetchSingleBookFromMongo(id) {
  const foundBook = await Book.findById(id);
  return foundBook;
}

async function insertBookIntoMongo(data) {
  const createdBook = await Book.create(data);
  return createdBook;
}

async function modifyBookInMongo(id, changes) {
  const result = await Book.findByIdAndUpdate(id, changes);
  return result;
}

async function removeBookFromMongo(id) {
  const result = await Book.findByIdAndUpdate(id, { deleted: true });

  return result;
}

module.exports = {
  insertBookIntoMongo,
  fetchSingleBookFromMongo,
  fetchBooksFromMongo,
  modifyBookInMongo,
  removeBookFromMongo,
};

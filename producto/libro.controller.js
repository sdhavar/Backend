const { insertBookIntoMongo, fetchBooksFromMongo, removeBookFromMongo, modifyBookInMongo, fetchSingleBookFromMongo } = require("../producto/libro.actions");

async function fetchFilteredBooks(query) {
    const searchResults = await fetchBooksFromMongo(query);
    return searchResults;
}

async function fetchBookById(id) {
    const book = await fetchSingleBookFromMongo(id);
    return book;
}

async function insertNewBook(data, authorId) {
    data["author_id"] = authorId;
    const createdBook = await insertBookIntoMongo(data);
    return createdBook;
}

function updateExistingBook(data) {
    const { _id, ...changes } = data;
    const updatedBook = modifyBookInMongo(_id, changes);
    return updatedBook;
}

function removeExistingBook(id) {
    const deletedBook = removeBookFromMongo(id);
    return deletedBook;
}

module.exports = {
    fetchFilteredBooks,
    fetchBookById,
    insertNewBook,
    updateExistingBook,
    removeExistingBook
}

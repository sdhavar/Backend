const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    genre: { type: String, required: true },
    publishDate: { type: String, required: true },
    publisher: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true, immutable: true },
    deleted: { type: Boolean, default: false }
  }, {
    versionKey: false,
    timestamps: true
});
  
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;

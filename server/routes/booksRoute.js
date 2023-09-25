const router = require("express").Router();
const Book = require("../models/booksModel");
const authMiddleware = require("../middlewares/authMiddleware");

// dodavanje knjige
router.post("/add-book", authMiddleware, async (req, res) => {
    try {
      const newBook = new Book(req.body);
      await newBook.save();
      return res.send({ success: true, message: "Knjiga uspešno dodata" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });

  // izmenjivanje knjige
router.put("/update-book/:id", authMiddleware, async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      return res.send({ success: true, message: "Knjiga uspešno izmenjena" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });

  // brisanje knjige
router.delete("/delete-book/:id", authMiddleware, async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      return res.send({ success: true, message: "Knjiga uspešno obrisana" });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });

  // dohvatanje svih knjiga
router.get("/get-all-books", authMiddleware, async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 });
      return res.send({ success: true, data: books });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });

  // dohvatanje knjige po id-ju
  router.get("/get-book-by-id/:id", authMiddleware, async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      return res.send({ success: true, data: book });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  });
  
  module.exports = router;
const router = require("express").Router();
const Issue = require("../models/issuesModel");
const Book = require("../models/booksModel");
const authMiddleware = require("../middlewares/authMiddleware");

// izdavanje knjige korisniku
router.post("/issue-new-book", authMiddleware, async (req, res) => {
  try {
    // dostupne kopije umanjujemo za 1
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: -1 } }
    );

    // kreiranje zapisa iznajmljivanja
    const newIssue = new Issue(req.body);
    await newIssue.save();
    return res.send({
      success: true,
      message: "Knjiga uspešno pozajmljena",
      data: newIssue,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// dohvatanje zapisa o pozajmljivanju za jednu knjigu
router.post("/get-issues", authMiddleware, async (req, res) => {
  try {
    delete req.body.userIdFromToken;
    const issues = await Issue.find(req.body).populate("book").populate("user").sort({ issueDate: -1 });
    return res.send({
      success: true,
      message: "Uspešno dohvatanje podataka o pozajmljivanju",
      data: issues,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// vraćanje knjige
router.post("/return-book", authMiddleware, async (req, res) => {
  try {
    // dostupne kopije uvećavamo za 1
    await Book.findOneAndUpdate(
      {
        _id: req.body.book,
      },
      {
        $inc: { availableCopies: 1 },
      }
    );

    // menjamo zapis(knjiga je vraćena)
    await Issue.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );

    return res.send({
      success: true,
      message: "Knjiga uspešno vraćena",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// brisanje zapisa o pozajmljivanju
router.post("/delete-issue", authMiddleware, async (req, res) => {
  try {
    // idostupne kopije uvećavamo za 1
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: 1 } }
    );

    // brisanje zapisa
    await Issue.findOneAndDelete({ _id: req.body._id });
    res.send({ success: true, message: "Zapis o pozajmljivanju uspešno izbrisan" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// izmenjivanje zapisa o pozajmljivanju
router.post("/edit-issue", authMiddleware, async (req, res) => {
  try {
    await Issue.findOneAndUpdate({
      _id: req.body._id,
    }, req.body);
    res.send({ success: true, message: "Zapis o pozajmljivanju uspešno izmenjen" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
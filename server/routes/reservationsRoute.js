const router = require("express").Router();
const Reservation = require("../models/reservationsModel");
const Book = require("../models/booksModel");
const authMiddleware = require("../middlewares/authMiddleware");

// rezervisanje knjige
router.post("/reserve-book", authMiddleware, async (req, res) => {
    try {
      // dostupne kopije umanjujemo za 1
      await Book.findOneAndUpdate(
        { _id: req.body.book },
        { $inc: { availableCopies: -1 } }
      );
  
      // kreiranje zapisa iznajmljivanja
      const newReservation = new Reservation(req.body);
      await newReservation.save();
      return res.send({
        success: true,
        message: "Knjiga uspešno rezervisana",
        data: newReservation,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  });

  // potvrda da je knjiga pozajmljena nakon rezervacije
router.post("/reservation-confirmed", authMiddleware, async (req, res) => {
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
      await Reservation.findOneAndUpdate(
        {
          _id: req.body._id,
        },
        req.body
      );
  
      return res.send({
        success: true,
        message: "Knjiga uspešno pozajmljena",
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  });

  // dohvatanje zapisa o rezervacijama
router.post("/get-reservations", authMiddleware, async (req, res) => {
    try {
      delete req.body.userIdFromToken;
      const reservations = await Reservation.find(req.body).populate("book").populate("user").sort({ issueDate: -1 });
      return res.send({
        success: true,
        message: "Uspešno dohvatanje podataka o rezervacijama",
        data: reservations,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  });

  module.exports = router;
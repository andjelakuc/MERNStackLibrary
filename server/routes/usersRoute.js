const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware");

//registracija novog korisnika
router.post("/register", async (req, res) => {
    try {
        //provera da li email već postoji
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "Korisnik sa ovom mejl adresom već postoji",
            });
        }

        //hash sifru
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //kreiranje novog korisnika
        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success: true,
            message: "Uspešno kreiran nalog",
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
});

//logovanje(prijava) korisnika
router.post("/login", async (req, res) => {
    try {
        //provera da li korisnik već postoji
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "Korisnik ne postoji",
            });
        }

        //provera da li je šifra tačna
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Šifra nije validna",
            });
        }

        //kreiranje i dodeljivanje tokena
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });
        return res.send({
            success: true,
            message: "Uspešno prijavljivanje",
            data: token
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
});

//dohvatanje detalja o korisniku
router.get("/get-logged-in-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userIdFromToken);
        if (!user) {
            return res.send({
                success: false,
                message: "Korisnik ne postoji",
            });
        }
        return res.send({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
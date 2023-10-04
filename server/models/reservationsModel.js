const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reservationDate: {
      type: Date,
      default: Date.now,
    },
    expireDate: {
      type: Date,
      default: "",
    },
    price: {
      type: Number,
      default: 50,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reservations", reservationSchema);
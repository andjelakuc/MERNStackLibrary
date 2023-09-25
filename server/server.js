const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");

app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);

app.listen(port, () => console.log(`Node server started at ${port}`));
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);

/* MONGOOSE SET UP */
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL) // dbName: "Nestly"
  .then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(`error: ${err}`));

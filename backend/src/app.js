require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const diaryRoute = require("./route/diary");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", diaryRoute);

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

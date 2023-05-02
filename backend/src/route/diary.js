const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Transactions,
  getTransactions,
} = require("../controller/diary");

// Register route
router.post("/register", Register);

// Login route
router.post("/login", Login);

// Transactions route
router.post("/transactions", Transactions);

// Transactions list route
router.get("/getTransactions", getTransactions);

module.exports = router;

const { User, Transaction } = require("../model/diary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { username, password, fullName } = req.body;

  try {
    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({
      username: username,
      password: hashedPassword,
      fullName: fullName,
    });

    res.json({ message: "User registered successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the given username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Verify the user's password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate a JWT token with the user's ID as the payload
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "12h",
    });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.Transactions = (req, res) => {
  const { amount, transactionType, partyName } = req.body;
  console.log(amount, transactionType, partyName);
  const token = req.headers.authorization.split(" ")[1];

  console.log("token", token);

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      console.log("decoded", decoded);
      Transaction.create({
        amount,
        transactionType,
        partyName,
        // userId: decoded.iat,
      })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((e) => {
          console.log(e);
          res.sendStatus(400);
        });
    }
  });
};

exports.getTransactions = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log(token);

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      console.log("decoded", decoded);
      Transaction.findAll().then((transactions) => {
        res.send(transactions);
      });
    }
  });
};

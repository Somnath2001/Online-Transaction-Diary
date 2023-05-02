const Sequelize = require("sequelize");

// Create a new Sequelize instance, using your database credentials
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// Define the "users" table
const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// // Define the "transactions" table
const Transaction = sequelize.define("transactions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  transactionType: {
    type: Sequelize.ENUM("paid", "received"),
    allowNull: false,
  },
  partyName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Set up associations between the "users" and "transactions" tables
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = { User, Transaction };
// Synchronize the database schema with the models
sequelize.sync();

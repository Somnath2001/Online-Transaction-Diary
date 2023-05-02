import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button, Table } from "react-bootstrap";
import LoginForm from "./components/signin/signin";
import RegisterForm from "./components/signup/signup";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [token, setToken] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [partyName, setPartyName] = useState("");
  const [message, setMessage] = useState([]);

  console.log(message);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchTransactions(storedToken);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username === "" || fullName === "" || password === "") {
      setMessage("All fields are mandatory");
    } else {
      try {
        const res = await axios.post("http://localhost:8080/register", {
          username,
          password,
          fullName,
        });
        setMessage("User registered successfully");
        setUsername("");
        setPassword("");
        setFullName("");
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage("All fields are mandatory");
      return;
    }
    console.log(message);
    try {
      const res = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      setToken(res.data.token);
      await fetchTransactions(res.data.token);

      localStorage.setItem("token", res.data.token);
      setMessage("login successfull");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setToken("");
    localStorage.removeItem("token");
    setTransactions([]);
    setMessage("Logout Successful");
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (amount === "" || partyName === "" || transactionType === "") {
      setMessage("All fields are mandatory");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/transactions",
        { amount, transactionType, partyName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Transaction recorded successfully");
      setAmount("");
      setPartyName("");
      setTransactionType("");
      fetchTransactions(token);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const fetchTransactions = async (token) => {
    try {
      const res = await axios.get("http://localhost:8080/getTransactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="parent">
      <Router>
        <Container className="mt-4">
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? (
                  <>
                    <TransactionForm
                      token={token}
                      handleTransaction={handleTransaction}
                      handleLogout={handleLogout}
                      amount={amount}
                      type={transactionType}
                      partyName={partyName}
                      setAmount={setAmount}
                      setType={setTransactionType}
                      setPartyName={setPartyName}
                      message={message}
                      setMessage={setMessage}
                    />
                  </>
                ) : (
                  <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    message={message}
                    setMessage={setMessage}
                  />
                )
              }
            />
            <Route
              exact
              path="/transactions"
              element={
                token && (
                  <TransactionList
                    transactions={transactions}
                    handleLogout={handleLogout}
                    token={token}
                  />
                )
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <RegisterForm
                  username={username}
                  password={password}
                  fullName={fullName}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setFullName={setFullName}
                  handleRegister={handleRegister}
                  message={message}
                  setMessage={setMessage}
                />
              }
            />

            <Route
              path="/transactions"
              element={
                token ? (
                  <>
                    <TransactionForm
                      token={token}
                      handleTransaction={handleTransaction}
                      handleLogout={handleLogout}
                      amount={amount}
                      type={transactionType}
                      partyName={partyName}
                      setAmount={setAmount}
                      setType={setTransactionType}
                      setPartyName={setPartyName}
                      message={message}
                      setMessage={setMessage}
                    />
                  </>
                ) : (
                  <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    message={message}
                    setMessage={setMessage}
                  />
                )
              }
            />
          </Routes>
        </Container>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navbar, Nav, Container, Form, Button, Table } from "react-bootstrap";

const TransactionForm = ({
  handleTransaction,
  amount,
  type,
  partyName,
  setAmount,
  setType,
  setPartyName,
  handleLogout,
  token,
  message,
  setMessage,
}) => {
  useEffect(() => {
    if (message.length > 0) {
      toast(message, {
        onClose: () => setMessage([]),
      });
    }
  }, [message]);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontFamily: "cursive", fontSize: "30px" }}
          >
            Transaction Diary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {token && (
                <>
                  <Nav.Link as={Link} to="/transactions">
                    Transactions
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Form style={{ width: "70%", margin: "auto", marginTop: "100px" }}>
        <h2 style={{ textAlign: "center", fontWeight: "300" }}>
          Add Transaction
        </h2>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="paid">Paid</option>
            <option value="received">Received</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPartyName">
          <Form.Label>Party Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter party name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleTransaction}>
          Add Transaction
        </Button>
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
      </Form>
    </div>
  );
};

export default TransactionForm;

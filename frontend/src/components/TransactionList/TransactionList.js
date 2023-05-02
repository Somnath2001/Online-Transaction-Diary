import React from "react";
import "./TransactionList.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button, Table } from "react-bootstrap";

const TransactionList = ({ transactions, handleLogout, token }) => {
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
                  <Nav.Link as={Link} to="/">
                    Add Transaction
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ overflow: "scroll", height: "80vh" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>Party Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.partyName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionList;

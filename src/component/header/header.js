import React from 'react';
import "./header.css";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() 
{
  return (
    <Navbar fixed="top" bg="dark" variant="dark" className="headerBarPlacement">
        <Navbar.Brand className="" as={Link} to="/main">Expense Tracker</Navbar.Brand>

        <Nav fill className="col-5 d-none d-sm-flex justify-content-end" variant="pills" defaultActiveKey="main">
            <Nav.Link eventKey="main" as={Link} to="/main/OverView">OverView</Nav.Link>
            <Nav.Link eventKey="overview" as={Link} to="/main/Report">Report</Nav.Link>
            <Nav.Link eventKey="logout" as={Link} to="/">Logout</Nav.Link>
        </Nav>

        <NavDropdown title="Menu" className="d-flex d-sm-none">
            <Nav.Link eventKey="mainDropdown" as={Link} to="/main/OverView">OverView</Nav.Link>
            <Nav.Link eventKey="overviewDropdown" as={Link} to="/main/Report">Report</Nav.Link>
            <Nav.Link eventKey="logoutDropdown" as={Link} to="/">Logout</Nav.Link>
        </NavDropdown>
    </Navbar>
  );
}

export default Header;

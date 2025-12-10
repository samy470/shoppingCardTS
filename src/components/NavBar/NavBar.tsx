import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { searchItems } from "../../redux/cartSlice";
import { useState } from "react";
import { useNavigate, Link, useLocation, Location } from "react-router-dom"

function NavBar(onLogout: any) {
  const dispatch: Dispatch<any> = useDispatch();
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate("/login");
    localStorage.removeItem("username");
    onLogout.onLogout();
  }

  if (location.pathname === '/login' || location.pathname === '/signin') return null;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/shopping">Shop</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query} onChange={(e) => { setQuery(e.target.value); dispatch(searchItems(e.target.value)) }}
            />
            <Button variant="outline-success" onClick={() => dispatch(searchItems(query))}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );


}

export default NavBar;
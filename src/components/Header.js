import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../asset/img/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Header = (props) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Log out of your account");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="" width={30} height={30} /> <span>NGUYEN VAN CHIEN</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Manage users
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown title="Setting">
              <NavLink className="dropdown-item" to="/login">
                Log in
              </NavLink>
              <NavDropdown.Item onClick={() => handleLogOut()}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../asset/img/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
export const Header = (props) => {
  const { logout, user } = useContext(UserContext);
  const nagivete = useNavigate();
  const handleLogOut = () => {
    logout();
    nagivete("/");
    toast.success("log out successfully");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="" width={30} height={30} /> <span>NGUYEN VAN CHIEN</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth) || window.location.pathname === "/") && (
            <>
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/users">
                  Manage users
                </NavLink>
              </Nav>
              <Nav className="ml-auto">
                {user && user.email && (
                  <span className="nav-link">
                    We come <b>{user.email}</b>
                  </span>
                )}
                <NavDropdown title="Setting">
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={() => handleLogOut()}>Logout</NavDropdown.Item>
                  ) : (
                    <NavLink className="dropdown-item" to="/login">
                      Log in
                    </NavLink>
                  )}
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

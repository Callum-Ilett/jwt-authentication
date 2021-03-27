import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth/authService";

const Appbar = ({ isLoggedIn, user, setUser, setIsLoggedIn }) => {
  const history = useHistory();

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
    AuthService.logout();

    history.push("/");
    window.location.replace(window.location.href);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        JWT-Authentication
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto"></Nav>
        <Nav className="mr-auto">
          {isLoggedIn && (
            <Navbar.Text>Signed in as: {user?.fullName}</Navbar.Text>
          )}
        </Nav>
        <Nav>
          {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}

          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Appbar;

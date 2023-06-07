import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import Logout from "../logout/logout";
import Register from "../Register/Register";

function NavBar({ setSearchResults }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img className="img-hidden" src="/images/logo.PNG" alt="Logo" />
            <i className="fas fa-code"></i>
          </NavLink>

          <SearchBar setSearchResults={setSearchResults} />

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Tienda"
                activeClassName="active"
                className="nav-links"
              >
                Tienda
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/Perfiles"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Perfiles
                  </NavLink>
                </li>
                <li>
                <Logout onClick={handleClick} />
                </li>
              </>
            ) : (
              <>
                <li>
                  <LoginButton />
                </li>
                <li >
                  <Register />
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

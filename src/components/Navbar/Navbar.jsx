import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import Logout from "../logout/logout";
import Register from "../Register/Register";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [click, setClick] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setClick(!click);
  };

  const isTiendaPage = location.pathname === "/tienda";

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link exact to="/" className="nav-logo">
            <img className="img-hidden" src="/images/logo.PNG" alt="Logo" />
            <i className="fas fa-code"></i>
          </Link>

          {isTiendaPage && <SearchBar className="search-bar" />}

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
                to="/tienda"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Tienda
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/profilepage"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Perfil
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
                <li>
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

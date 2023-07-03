import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import Logout from "../logout/logout";
import Register from "../Register/Register";
import axios from "axios";

function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [click, setClick] = useState(false);
  const { user } = useAuth0();
  const [usuario, setUsuario] = useState({});

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    if (user) {
      axios(`https://servidor-vinos.onrender.com/users?email=${user.email}`)
        .then(({ data }) => {
          setUsuario(data);
        })
        .catch((error) => console.log("parece que hubo un error:", error));
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link exact to="/" className="nav-logo">
            <img
              className="img-hidden"
              src="https://i.ibb.co/fN28Z9h/LOGO-2-DRINK-UP-Nav-Bar-1.png"
              alt="Logo"
            />
            <i className="fas fa-code"></i>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {usuario && usuario.admin ? (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/dashboard"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Panel
                </NavLink>
              </li>
            ) : null}
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

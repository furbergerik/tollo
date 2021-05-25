import React from "react";
import { Link, withRouter } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'



function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + '/img/tollo-logo.png'} width="140px"/>
          </Link>
          <Dropdown as={NavItem}>
  <Dropdown.Toggle as={NavLink}>Click to see more…</Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item>Hello there!</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>;
          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${props.location.pathname === "/" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/about" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/MyProfile" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/MyProfile">
                  My Profile
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/MyAdmin" ? "active" : ""
                  }`}
              >
                <Link className="nav-link fa fa-user" to="/MyAdmin">
                 My Admin
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/erik" ? "active" : ""
                  }`}
              >
               

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
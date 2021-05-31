import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';



function Navigation(props) {
  return (
    <div className="navigation ">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + '/img/tollo-logo.png'} width="140px"/>
          </Link>
        
          <div>
        
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${props.location.pathname === "/" ? "active" : ""
                  }`}
              >
                <Link className="nav-link d-none  d-md-block" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              
              
              <li
                className={`nav-item  ${props.location.pathname === "/MyProfile" ? "active" : ""
                  }`}
              >
                <Link className="nav-link d-none  d-md-block" to="/MyProfile">
                  My Profile
                </Link>
              </li>
              {/* <li
                className={`nav-item  ${props.location.pathname === "/MyAdmin" ? "active" : ""
                  }`}
              >
                <Link className="nav-link  d-none  d-md-block" to="/MyAdmin">
                 My Admin
                </Link>
              </li> */}
              <li
              
              >
                <p className="logout nav-link d-none  d-md-block" onClick={props.handleLogout}>
                  Log out
                </p>
              </li>
              <li class="nav-item dropdown d-block  d-md-none ">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-bars"></i>
        </a>
        <div class=" dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/">Home</a>
          <a class="dropdown-item" href="MyProfile">MyProfile</a>
          <a class="dropdown-item" href="MyAdmin">MyAdmin</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onClick={props.handleLogout}>Log out</a>
        </div>
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
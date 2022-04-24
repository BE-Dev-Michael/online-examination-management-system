import React from 'react'
import { Link } from 'react-router-dom'
import './navbar-style.css';

function NavbarLinks(props) {
  return (
    <div>
      <div className="hidden md:block">
        <div className="nav-menu-container">
          <Link className={props.navbar ? "nav-links alt" : "nav-links"} to="/">
            Home
          </Link>
          <Link className={props.navbar ? "nav-links alt" : "nav-links"} to="/#">
            About
          </Link>
          <Link className={props.navbar ? "nav-links alt" : "nav-links"} to="/login">
            Log In
          </Link>
          <Link className={props.navbar ? "sign_up-btn alt" : "sign_up-btn"} to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavbarLinks



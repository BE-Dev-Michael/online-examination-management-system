import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar-style.css';

function DropdownMenu(props) {
  return (
    <div>
     <div className={props.collapse ? '' : 'hidden'}>
            <div className={"nav-menu active md:hidden"}>
                <a>
                    <Link className="nav-links-mobile" to="/">
                        Home
                    </Link>
                </a>
                <a>
                    <Link className="nav-links-mobile" to="/#">
                        About
                    </Link>
                </a>
                <a>
                    <Link className="nav-links-mobile" to="/login">
                        Log In
                    </Link>
                </a>
                    <Link className="sign_up-btn dropdown" to="/signup">
                        Sign Up
                    </Link>
            </div>
       
      </div>
    </div>
  )
}

export default DropdownMenu
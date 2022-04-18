import React from 'react'
import { Link } from 'react-router-dom'

function NavbarLinks() {
  return (
    <div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <a className="text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/">
              HOME
          </a>
          <a className="text-white dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
              ABOUT
          </a>
          <Link className="text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/login">
            LOGIN
          </Link>
          {/* Color used: #656780 */}
          <Link className="bg-[#656780] text-white  hover:bg-[#5a5b72] transition-all ease-linear px-7 py-2 rounded-3xl text-sm font-medium" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavbarLinks
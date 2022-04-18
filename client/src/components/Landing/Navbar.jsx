import React, {useState} from 'react'
import DropdownMenu from './DropdownMenu'
import NavbarLinks from './NavbarLinks'

function Navbar() {
    const [collapse, setCollapse] = useState(false)

    const dropdownHandler = () => {
        console.log('collapse')
        setCollapse(!collapse)
    }
    return (
      <div>
        <nav className="bg-transparent fixed w-screen z-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className="w-full justify-between flex items-center">
                <a className="flex-shrink-0" href="/">
                  <h1 className='text-white'>Logo</h1>
                </a>
                <NavbarLinks/>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button onClick={dropdownHandler} className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                  <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <DropdownMenu collapse={collapse}/>
        </nav>
      </div>
    )
}

export default Navbar
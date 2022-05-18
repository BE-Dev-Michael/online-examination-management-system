import React, {useState} from 'react'
import DropdownMenu from './DropdownMenu'
import NavbarLinks from './NavbarLinks'
import './navbar-style.css';
import { CgMenuRight } from 'react-icons/cg'

function Navbar() {
    const [collapse, setCollapse] = useState(false)
    const [navbar, setNavbar] = useState(false)
    const [open,setOpen]=useState(false);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const changeBackground = (ref) => {
      if((open==true)){
        setNavbar(true);
      }
      else{
        if(window.scrollY >= 85){
          setNavbar(true);
        } else{
          setNavbar(false);
        }
      }
      
    }

    const dropdownHandler = () => {
        setCollapse(!collapse)
        setOpen(!open)
        if(window.scrollY <= 85){
          setNavbar(!navbar)
        }
        handleClick()
    }

    window.addEventListener('scroll', changeBackground)

    return (
      <div>
        <nav className={navbar ? "navbar active" : "navbar"}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className="w-full justify-between flex items-center">
                <a className="flex-shrink-0" href="/">
                  <img class="h-10 w-22 logo" src={navbar ? "../../images/logo-c.png" : "../../images/logo-w.png"} alt="testdeck-logo"/>
                </a>
                <NavbarLinks navbar={navbar}/>
              </div>
              <div onClick={dropdownHandler} className='text-3xl absolute right-12 top-6 cursor-pointer md:hidden'>
                <CgMenuRight className={navbar ? "text-[#74bade]" : "text-white"}/>
                {/* <img class="h-5 w-5" src={navbar ? "../../images/menu-b.png" : "../../images/menu.png"} alt="menu"/> */}
              </div> 
            </div>
          </div>
          <DropdownMenu collapse={collapse}/>
        </nav>
      </div>
    )
}

export default Navbar
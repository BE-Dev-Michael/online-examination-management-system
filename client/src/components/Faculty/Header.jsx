import React, { useRef, useEffect, useState } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import sidebarState from './sidebarAtom'
import { atom, useRecoilState } from 'recoil'
import { FaRegUserCircle } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import getUserData from '../Auth/authService'
import { useNavigate, Link  } from 'react-router-dom'

const profileMenuState = atom({
  key: 'profileMenuState',
  default: false
})

function ProfileMenu(props) {
  const navigate = useNavigate()
  const [isDropdownVisible, setIsDropdownVisible] = useRecoilState(profileMenuState)

  const logout = () => {
     setIsDropdownVisible(!isDropdownVisible)
     localStorage.removeItem('token')
     navigate('/')
  }

  return(
    <>
      <div class="absolute right-12 -bottom-24 z-10 bg-white divide-y divide-gray-100 shadow-lg w-44 ring-2 ring-black ring-opacity-10">
          <ul class="py-1 text-md text-gray-700 list-none" aria-labelledby="dropdownDividerButton">
            <li>
              <Link onClick={() => setIsDropdownVisible(!isDropdownVisible)} to={'/faculty/profile'} className="flex items-center block px-4 py-2 hover:bg-gray-100 font-semibold">
                <span className='mr-4'><FaRegUserCircle/></span>
                Profile
              </Link>
            </li>
          </ul>
          <div class="py-1">
            <a onClick={logout} class="flex items-center block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 00 font-semibold">
              <span className='mr-4'><CgLogOut/></span>
              Logout
            </a>
          </div>
      </div>
    </>
  )
}
function Header() {
  const [showSidebar, setShowSidebar] = useRecoilState(sidebarState)
  const [isDropdownVisible, setIsDropdownVisible] = useRecoilState(profileMenuState)
  const [email, setEmail] = useState(null)
  const [picture, setPicture] = useState(null)
  const profileRef = useRef(null)
  const profileLinkRef = useRef(null)
  const logoutLinkRef = useRef(null)
  
  useEffect(() => {
      const setUserEmail = async () =>{
         const { email, picture } = await getUserData()
         setEmail(email)
         setPicture(picture)
      }
      setUserEmail()
  }, [])
  

  const outsideClick = (e) => {
    if (profileRef.current.contains(e.target) || profileLinkRef.current.contains(e.target) || logoutLinkRef.current.contains(e.target)) {
       return
    }

    setIsDropdownVisible(false)
 }

 useEffect(() => {
    if (isDropdownVisible) {
        document.addEventListener('mousedown', outsideClick)
    }
     
     return () => {
       document.removeEventListener('mousedown', outsideClick);
     }
 }, [isDropdownVisible])

  return(
    <div className="relative w-full bg-white sm:bg-white md:bg-transparent px-5 py-3 rounded-3xl">
      <div className={`flex justify-between sm:justify-between md:justify-end`}>
        <button className="sm:block md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
          <CgMenuLeft className='text-3xl cursor-pointer hover:text-[#7B9EBE] transition-all ease-linear'/>
        </button>
        <div className='flex gap-4 items-center'>
          <h1 className='font-semibold text-md text-white'>{email}</h1>
          <a ref={profileRef} onClick={() => setIsDropdownVisible(!isDropdownVisible)} className="block relative cursor-pointer">
            <img alt="profil" src={`/profile-picture/${picture}`} className="mr-0 md:mr-7 object-cover rounded-full h-10 w-10 "/>
          </a>
        </div>
      </div>
      {isDropdownVisible ? 
        <div className='absolute z-20 right-14 w-0 h-0 border-l-[10px] border-l-transparent border-r-transparent border-r-[10px] border-b-[15px] border-b-[#ffffff]'></div>
      : ''}
      {isDropdownVisible ? <ProfileMenu/> : ''}
    </div>
    )
}

export default Header
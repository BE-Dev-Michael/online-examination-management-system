import React, { useRef, useEffect } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import sidebarState from './sidebarAtom'
import { atom, useRecoilState } from 'recoil'
import { FaRegUserCircle } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'

const profileMenuState = atom({
  key: 'profileMenuState',
  default: false
})

function ProfileMenu() {
  return(
    <>
      <div class="absolute right-6 -bottom-24 z-10 bg-white divide-y divide-gray-100 shadow-lg w-44 ring-2 ring-black ring-opacity-10">
          <ul class="py-1 text-md text-gray-700" aria-labelledby="dropdownDividerButton">
            <li>
              <a href="#" class="flex items-center block px-4 py-2 hover:bg-gray-100 font-semibold">
                <span className='mr-4'><FaRegUserCircle/></span>
                Profile
              </a>
            </li>
          </ul>
          <div class="py-1">
            <a href="#" class="flex items-center block px-4 py-2 text-sm hover:bg-gray-100 00 font-semibold">
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
  const profileRef = useRef(null)

  const outsideClick = (e) => {
    if (profileRef.current.contains(e.target)) {
       return
    }

    setIsDropdownVisible(false)
 }

 useEffect(() => {
     document.addEventListener('mousedown', outsideClick)
     console.log('mousedown')
     return () => {
       document.removeEventListener('mousedown', outsideClick);
     }
 }, [isDropdownVisible])

  return(
    <div className="relative w-full bg-white px-5 py-3 rounded-3xl">
      <div className={`flex justify-between sm:justify-between md:justify-end`}>
        <button className="sm:block md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
          <CgMenuLeft className='text-3xl cursor-pointer hover:text-[#7B9EBE] transition-all ease-linear'/>
        </button>
        <a ref={profileRef} onClick={() => setIsDropdownVisible(!isDropdownVisible)} href="#" className="block relative">
          <img alt="profil" src="https://avatarfiles.alphacoders.com/275/275525.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
        </a>
      </div>
      {isDropdownVisible ? 
        <div className='absolute z-20 right-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-transparent border-r-[10px] border-b-[15px] border-b-[#7B9EBE]'></div>
      : ''}
      {isDropdownVisible ? <ProfileMenu/> : ''}
    </div>
    )
}

export default Header
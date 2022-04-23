import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SidebarMenus(props) {
  const activeClass = "w-full font-thin uppercase text-white flex items-center p-4 my-2 transition-colors duration-200 justify-start rounded-xl bg-gradient-to-r from-[#7B9EBC] to-[#DBA390]"
  const inactiveClass = "w-full font-thin uppercase text-black flex items-center p-4 my-2 transition-colors duration-200 justify-start rounded-xl"
  console.log(props.activeIndex);
  return (
      <div>
        <Link onClick={props.active} className={props.isActive && props.elemIndex === props.activeIndex ? activeClass : inactiveClass} to={props.endPoint}>
          <span className="text-left">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                  </path>
              </svg>
          </span>
          <span className="mx-4 text-sm font-normal">
              {props.menuName}
          </span>
        </Link>
      </div>
  )
}
function Sidebar() {
  const [activeLink, setActiveLink] = useState({ isActive: false, index: 0})
  
  const sidebar = [
      {
          menuName: 'Dashboard',
          endPoint: '/faculty/dashboard'
      },
      {
          menuName: 'Question Banks',
          endPoint: '/faculty/banks'
      },
      {
          menuName: 'Exams',
          endPoint: '/faculty/exams'
      },
      {
          menuName: 'Reports',
          endPoint: '/faculty/reports'
      },
  ]

  const activeLinkHandler = (isActive, index) => {
      const keys = Object.keys(activeLink)
      setActiveLink({...activeLink, [keys[0]]: isActive, [keys[1]]: index})
  }

  
  return (
    <div className="h-screen hidden lg:block my-4 ml-4 mb-4 shadow-lg relative w-80 mr-10">
      <div className="bg-white h-screen rounded-[26px] p-5">
        <div className="flex items-center justify-center pt-6 mb-12">
          <h1>LOGO</h1>
        </div>
        {sidebar.map((prop, index) => {
            return <SidebarMenus elemIndex={index} activeIndex={activeLink.index} isActive={activeLink.isActive} active={() => activeLinkHandler(true, index)} key={index} menuName={prop.menuName} endPoint={prop.endPoint}/>
        })}
      </div>
    </div>
  )
}

export default Sidebar
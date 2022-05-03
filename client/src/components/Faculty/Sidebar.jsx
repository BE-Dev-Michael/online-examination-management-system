import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CgMenuLeft } from 'react-icons/cg'
import { useRecoilState, useRecoilValue } from 'recoil'
import sidebarState from './sidebarAtom';
import logo from '../../assets/images/secondary_logo.png'
import { MdDashboard } from 'react-icons/md'
import { BsBoxSeam } from 'react-icons/bs'
import { RiFileList2Line } from 'react-icons/ri'
import { HiOutlineDocumentReport } from 'react-icons/hi'

function SidebarMenus(props) {
  const isSidebarVisible = useRecoilValue(sidebarState)
  const activeClass = `w-full max-h-[92px] font-thin uppercase text-white flex ${isSidebarVisible ? 'flex-row rounded-xl' : 'flex-col gap-1 h-[92px] justify-center'} items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-[#7CBE83] to-[#7B9EBC]`
  const inactiveClass = `w-full max-h-[92px] font-thin uppercase text-black flex ${isSidebarVisible ? 'flex-row rounded-xl' : 'flex-col gap-1 h-[92px] justify-center'} items-center p-4 my-2 transition-colors duration-200 justify-start`
  
  return (
      <div>
        <Link onClick={props.active} className={props.isActive && props.elemIndex === props.activeIndex ? activeClass : inactiveClass} to={props.endPoint}>
          <span className={`${isSidebarVisible ? 'text-left' : 'text-center'}`}>
              {props.icon}
          </span>
          <span className={`mx-4 ${isSidebarVisible ? 'text-sm' : 'text-xs'} font-semibold text-center ease-in-out duration-50`}>
              {props.menuName}
          </span>
        </Link>
      </div>
  )
}

function Sidebar() {
  const [activeLink, setActiveLink] = useState({ isActive: false, index: 0})
  const [showSidebar, setShowSidebar] = useRecoilState(sidebarState)
  
  const sidebar = [
      {
          menuName: 'Dashboard',
          endPoint: '/faculty/dashboard',
          icon: <MdDashboard/>
      },
      {
          menuName: 'Question Banks',
          endPoint: '/faculty/banks',
          icon: <BsBoxSeam/>
      },
      {
          menuName: 'Exams',
          endPoint: '/faculty/exams',
          icon: <RiFileList2Line/>
      },
      {
          menuName: 'Reports',
          endPoint: '/faculty/reports',
          icon: <HiOutlineDocumentReport/>
      },
  ]

  const activeLinkHandler = (isActive, index, isMobile) => {
      const keys = Object.keys(activeLink)
      setActiveLink({...activeLink, [keys[0]]: isActive, [keys[1]]: index})
      if (isMobile === true) {
          setShowSidebar(false)
      }
  }
  
  return (
    // `mobile:fixed mobile:top-0 mobile:-left-[50vw] mobile:z-40 md:block relative overflow-hidden ${showSidebar ? 'w-[20vw] max-w-[250px] min-w-[250px] mobile:-left-[0vw] mobile:ease-in-out mobile:duration-300' : 'w-[7vw] max-w-[100px] min-w-[100px] mobile:translate-x-0'} ease-in-out duration-300`
    <>
      <div className={`${showSidebar ? 'w-[20vw] max-w-[300px] min-w-[300px]' : 'w-[7vw] max-w-[100px] min-w-[100px]'} hidden md:block ease-in-out duration-300`}>
        <div className={`bg-white h-[85%] shadow-lg rounded-[26px] py-2 ${showSidebar ? 'px-5' : 'px-0'} ease-in-out duration-300`}>
          <div className="flex flex-wrap items-center justify-center pt-6 mb-12">
            <div className={`flex ${showSidebar ? 'justify-end mr-2' : 'justify-center'} w-full mb-10`}>
              <button onClick={() => setShowSidebar(!showSidebar)}>
                <CgMenuLeft className='text-3xl cursor-pointer hover:text-[#7B9EBE] transition-all ease-linear'/>
              </button>
            </div>
            <img className="min-w-[50px]" src={logo} alt="logo" width={80} />
          </div>
          {sidebar.map((prop, index) => {
              return <SidebarMenus elemIndex={index} activeIndex={activeLink.index} isActive={activeLink.isActive} active={() => activeLinkHandler(true, index, false)} key={index} menuName={prop.menuName} endPoint={prop.endPoint} icon={prop.icon}/>
          })}
        </div>
      </div>
      
      {/* {If mobile screen} */}
      <div className={`${showSidebar ? 'w-screen -left-[0vw]' : 'w-0'} fixed z-40 -left-[50vw] top-0 block md:hidden ease-in-out duration-300`}>
        <div className={`bg-white h-screen shadow-lg py-2 ${showSidebar ? 'px-5' : 'px-0'} ease-in-out duration-300`}>
          <div className="flex flex-wrap items-center justify-center pt-6 mb-12">
            <div className={`flex justify-end mr-2 w-full mb-10`}>
              <button onClick={() => setShowSidebar(!showSidebar)}>
                <CgMenuLeft className='text-3xl cursor-pointer hover:text-[#7B9EBE] transition-all ease-linear'/>
              </button>
            </div>
            <img className="min-w-[50px]" src={logo} alt="logo" width={80} />
          </div>
          {sidebar.map((prop, index) => {
              return <SidebarMenus elemIndex={index} activeIndex={activeLink.index} isActive={activeLink.isActive} active={() => activeLinkHandler(true, index, true)} key={index} menuName={prop.menuName} endPoint={prop.endPoint} icon={prop.icon}/>
          })}
        </div>
      </div>

    </>
  )
}

export default Sidebar
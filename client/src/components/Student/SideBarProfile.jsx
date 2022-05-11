import { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md'
import { FaHistory } from "react-icons/fa";

function SidebarMenus(props) {
    const activeClass = { set1: "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-[#7CBE83] to-[#7B9EBC]", set2: "-mr-1 font-medium" }
    const inactiveClass = { set1: "relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group", set2: "group-hover:text-gray-700" }

    return (
        <div className="">
            <Link onClick={props.active} className={props.isActive && props.elemIndex === props.activeIndex ? activeClass.set1 : inactiveClass.set1} to={props.endPoint}>
                {props.icon}
                <span className={props.isActive && props.elemIndex === props.activeIndex ? activeClass.set2 : inactiveClass.set2}>{props.menuName}</span>
            </Link>
        </div>
    )
}

const SideBarProfile = () => {
    const [activeLink, setActiveLink] = useState({ isActive: false, index: 0 })
    const sidebar = [
        {
            menuName: 'Exams',
            endPoint: '/student',
            icon: <MdDashboard />
        },
        {
            menuName: 'Activity',
            endPoint: '/student/activity',
            icon: <FaHistory />
        }
    ]

    const activeLinkHandler = (isActive, index) => {
        const keys = Object.keys(activeLink)
        setActiveLink({ ...activeLink, [keys[0]]: isActive, [keys[1]]: index })
    }

    return (
        <aside className="sm:block hidden ml-5 pb-3 px-6 w-72 flex-col justify-between h-full border bg-white transition duration-300 rounded-2xl shadow-sm">
            <div>

                <div className="mt-8 text-center">
                    <img src="https://avatarfiles.alphacoders.com/275/275525.jpg" alt="" className="w-28 h-28 m-auto rounded-full object-cover" />
                    <Link onClick={() => activeLinkHandler(false, 0)} to={'/student/profile'}>
                        <h5 className=" mt-4 text-lg font-semibold text-gray-600 hover:text-cyan-600 hover:underline underline-offset-4">Romeo Gatchalian</h5>
                    </Link>
                    <span className=" text-gray-400 ">Student | BSIT-4Q</span>
                </div>

                <div className="space-y-2 tracking-wide mt-8">
                    {sidebar.map((prop, index) => {
                        return <SidebarMenus elemIndex={index} activeIndex={activeLink.index} isActive={activeLink.isActive} active={() => activeLinkHandler(true, index)} key={index} menuName={prop.menuName} endPoint={prop.endPoint} icon={prop.icon} />
                    })}
                </div>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="group-hover:text-gray-700">Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default SideBarProfile
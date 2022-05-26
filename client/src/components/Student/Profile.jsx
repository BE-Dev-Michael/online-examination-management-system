import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import EditInfo from './ProfileComponent/EditInfo'
import ChangePass from './ProfileComponent/ChangePass';
import UpdatePic from './ProfileComponent/UpdatePic';
import getUserData from '../Auth/authService'


function Dropdown() {
    const [showOptions, setShowOptions] = useState(false)
    const links = [{
        title: 'Edit Information',
        link: '/student/profile/editinformation'
    }, {
        title: 'Change Password',
        link: '/student/profile/changepassword'
    }, {
        title: 'Update Picture',
        link: '/student/profile/updatepicture'
    }]

    return (
        <div className="absolute right-0 w-32 mx-5 mt-2 shadow-lg">
            <div>
                <button onClick={() => setShowOptions(!showOptions)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-slate-400 dark:bg-[#26292F] dark:border-[#292d35] dark:text-[#e2dddd] dark:focus:ring-offset-gray-700 dark:focus:ring-[#121b27]">
                    Edit
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
            {showOptions && (
                <div className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#26292F]" >
                    <div className="py-1" role="none">
                        {links.map((prop, index) => {
                            return <Link key={index} onClick={() => setShowOptions(!showOptions)} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 w-full text-left dark:hover:bg-gray-800 dark:text-[#e2dddd]" to={prop.link}>{prop.title}</Link>
                        })}
                    </div>
                </div>)}
        </div>
    )
}

const Profile = () => {
    // This is a sample data
    const [user, setUser] = useState({
        id: 100,
        name: "Romeo Gatchalian",
        username: "romeo",
        email: "romeo@gmail.com",
        password: "password123"
    })

    const [userData, setUserData] = useState()

    useEffect(() => {
        if (userData) {
            console.log(userData)
        }
    }, [userData])


    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData()
            setUserData({ name: userData.fullName, username: userData.username, email: userData.email, picture: userData.picture })
        }
        fetchUserData()
    }, [])

    return (
        <>
            {userData &&
                <div className="relative h-full w-screen mx-5 rounded-2xl shadow-sm bg-white border dark:bg-[#1e2027] dark:border-[#292d35]" >
                    <div className="relative flex">
                        <h1 className="ml-9 mt-4  text-gray-600 text-2xl font-bold dark:text-gray-300" >Account Settings</h1>
                        <Dropdown />
                    </div>

                    <div className="relative flex justify-center">
                        <div className="relative lg:flex justify-center w-10/12 xl:w-6/12">
                            <Routes>
                                {/* Change the props user with real data */}
                                <Route path="/" element={<EditInfo user={userData} toggle={false} />} />
                                <Route path="/editinformation" element={<EditInfo user={userData} toggle={true} />} />
                                <Route path="/changepassword" element={<ChangePass user={userData} />} />
                                <Route path="/updatepicture" element={<UpdatePic user={userData} />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile
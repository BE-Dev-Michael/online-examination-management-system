import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import EditInfo from './ProfileComponent/EditInfo'
import ChangePass from './ProfileComponent/ChangePass';
import UpdatePic from './ProfileComponent/UpdatePic';


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
        <div className="absolute right-0 w-32 mx-5 mt-2 shadow-sm">
            <div>
                <button onClick={() => setShowOptions(!showOptions)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-slate-500">
                    Edit
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
            {showOptions && (<div className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >
                <div className="py-1" role="none">
                    {links.map((prop, index) => {
                        return <Link key={index} onClick={() => setShowOptions(!showOptions)} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 w-full text-left" to={prop.link}>{prop.title}</Link>
                    })}
                </div>
            </div>)}
        </div>
    )
}

const Profile = () => {
    // This is a sample data
    const [user, setUser] = useState({
        name: "Romeo Gatchalian",
        username: "romeo",
        email: "romeo@gmail.com",
        section: "BSIT-4Q",
        password: "password123"
    })

    return (
        <div className="relative h-full w-screen mx-5 rounded-2xl shadow-sm bg-white border" >
            <div className="relative flex">
                <h3 className="text-lg font-medium m-3" >ACCOUNT INFORMATION</h3>
                <Dropdown />
            </div>
            <hr className="h-2 w-full" />

            <div className="relative flex justify-center">
                <div className="relative lg:flex justify-center w-10/12 xl:w-6/12">
                    <Routes>
                        {/* Change the props user with real data */}
                        <Route path="/" element={<EditInfo user={user} toggle={false} />} />
                        <Route path="/editinformation" element={<EditInfo user={user} toggle={true} />} />
                        <Route path="/changepassword" element={<ChangePass user={user} />} />
                        <Route path="/updatepicture" element={<UpdatePic />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Profile
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/Student/NavigationBar';
import Examboard from '../components/Student/Examboard';
import Activityboard from '../components/Student/Activityboard';
import SideBarProfile from '../components/Student/SideBarProfile';
import Profile from '../components/Student/Profile';
import ExamDescription from '../components/Student/ExamDescription';
import ExamResult from '../components/Student/ExamResult';
import { useNavigate  } from 'react-router-dom'
import getUserData from '../components/Auth/authService';

const Student = () => {
    const navigate = useNavigate()
    const [isStudent, setIsStudent] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('token')
      //* If user is not authenticated, it cannot bypass a protected component
      if (!token) {
          navigate('/')
      }

      const getUserRole = async () => {
        const { role } = await getUserData()
        if(role === 'Faculty') {
          setIsStudent(false)
          navigate('/faculty/dashboard')
        } else {
          setIsStudent(true)
        } 
      }
      getUserRole()
    }, [])

    return (
      <>
        {localStorage.getItem('token') && isStudent &&
          <div className="bg-gradient-to-b from-[#216E81] via-[#eaf8fc] to-[#ffffff]  pt-3 relative w-screen h-screen overflow-auto dark:from-[#1E1F25]  dark:to-[#1E1F25]">
              <NavigationBar />

              <div className="flex">
                  <SideBarProfile />

                  <Routes>
                      <Route path="/" element={<Examboard />} />
                      <Route path="activity" element={<Activityboard />} />
                      <Route path="profile/*" element={<Profile />} />
                      <Route path="examination/:id" element={<ExamDescription />} />
                      <Route path="activity/result" element={<ExamResult />} />
                  </Routes>
              </div>
          </div>
        }
      </>
    )
}

export default Student
import React from 'react'
import './bg.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Faculty/Dashboard'
import QuestionBanks from '../components/Faculty/QuestionBanks'
import Questions from '../components/Faculty/Questions'
import Exams from '../components/Faculty/Exams'
import Reports from '../components/Faculty/Reports'
import Sidebar from '../components/Faculty/Sidebar'
import Background from '../components/Faculty/Background'
import Header from '../components/Faculty/Header'
import { useRecoilValue } from 'recoil'
import sidebarState from '../components/Faculty/sidebarAtom'

function Content({children}) {
  return(
    <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
        {children}
    </div>
  )
}
function Faculty() {
  const isSidebarVisible = useRecoilValue(sidebarState)
  
  return (
    <Background>
      <Sidebar/>
      <main className={`flex flex-col gap-4 main-container w-[100vw] sm:w-[100vw] h-auto ${isSidebarVisible ? 'w-[80vw] mobile:w-[100vw]' : 'w-[100vw]'}`}>
        <header className='w-full'>
          <Header/>
        </header>
        <Content>
          <Routes>
            {/* //* Child routes of /faculty */}
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="banks" element={<QuestionBanks/>} /> 
            <Route path="banks/:id" element={<Questions/>} />
            <Route path="exams" element={<Exams/>} />
            <Route path="reports" element={<Reports/>} />
          </Routes>
        </Content>
      </main>
    </Background>
  )
}

export default Faculty
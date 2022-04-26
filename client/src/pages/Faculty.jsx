import React from 'react'
import './bg.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Faculty/Dashboard'
import QuestionBanks from '../components/Faculty/QuestionBanks'
import Exams from '../components/Faculty/Exams'
import Reports from '../components/Faculty/Reports'
import Sidebar from '../components/Faculty/Sidebar'
import Background from '../components/Faculty/Background'
import Header from '../components/Faculty/Header'
import { useRecoilValue } from 'recoil'
import sidebarState from '../components/Faculty/sidebarAtom'

function Faculty() {
  const isSidebarVisible = useRecoilValue(sidebarState)
  return (
    <Background>
      <Sidebar/>
      <main className={`flex flex-col gap-4 main-container w-[100vw] sm:w-[100vw] max-h-[95vh] ${isSidebarVisible ? 'w-[80vw] mobile:w-[100vw]' : 'w-[100vw]'}`}>
        <header>
          <Header/>
        </header>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/banks" element={<QuestionBanks/>} />
          <Route path="/exams" element={<Exams/>} />
          <Route path="/reports" element={<Reports/>} />
        </Routes>
      </main>
    </Background>
  )
}

export default Faculty
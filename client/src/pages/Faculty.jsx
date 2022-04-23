import React, { useState, useEffect } from 'react'
import './bg.css'
import axios from 'axios'
import { Routes, Route, Router } from 'react-router-dom';
import Dashboard from '../components/Faculty/Dashboard'
import QuestionBanks from '../components/Faculty/QuestionBanks'
import Exams from '../components/Faculty/Exams'
import Reports from '../components/Faculty/Reports'
import Sidebar from '../components/Faculty/Sidebar'
import Background from '../components/Faculty/Background'
import Header from '../components/Faculty/Header'

function Faculty() {
    return (
        <div>
          <Background>
            <Sidebar/>
              <div className="flex flex-col gap-4 w-full pl-0 md:p-4 md:space-y-4">
                <Header/>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/banks" element={<QuestionBanks/>} />
                    <Route path="/exams" element={<Exams/>} />
                    <Route path="/reports" element={<Reports/>} />
                </Routes>
              </div>
          </Background>
        </div>
      )
}

export default Faculty
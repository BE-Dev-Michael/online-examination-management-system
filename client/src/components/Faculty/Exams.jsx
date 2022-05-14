import React, { useEffect, useState } from 'react'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import sidebarState from './sidebarAtom'
import { IoAddCircleOutline, IoSearchOutline, IoClose, IoEllipsisHorizontal } from 'react-icons/io5'
import './QuestionBanks.css'
import { useNavigate } from 'react-router-dom'
import getUserData from '../Auth/authService'

//* GET and POST method
//* POST for adding exam
//* GET for getting all exams
const EXAMS_URI = `${process.env.REACT_APP_BASE_URL}/api/exams`
const EXAM_URI = `${process.env.REACT_APP_BASE_URL}/api/exams/`

const examsState = atom({
  key: 'examsState',
  default: []
})

function ExamCard(props) {
  const initials = [...props.title].filter(initial => initial === initial.toUpperCase())
  const navigate = useNavigate()

  const previewExam = async () => {
    try {
      const examData = await axios.get(EXAM_URI.concat(props._id))
      navigate(`/faculty/exams/${examData.data._id}`)
    } catch (error) {
        throw new Error(error)
    }
  }

  return(
    <div className="flex flex-col items-center justify-between shadow-lg rounded-[1.2rem] w-[350px] md:w-full lg:w-full p-4 bg-white relative min-h-[240px] max-h-[240px]">
      <div className='flex justify-between items-center w-full'>
        <h1 className='font-bold'>{props.title}</h1>
        {/* <span className='text-gray-600 bg-[#C8CFCF] rounded-xl py-1 px-5 text-xs'>
          {props.noOfQuestions === 1 ? `${props.noOfQuestions} Question` : `${props.noOfQuestions} Questions`} 
        </span> */}
        <span className={`${props.isPublished !== true ? 'bg-[#C8CFCF] text-gray-600' : 'bg-[#7CBE83] text-white'}  rounded-xl py-1 px-5 text-xs`}>
          {props.isPublished !== true ? 'Unpublished' : 'Published'}
        </span>
      </div>
      <div className="w-full flex items-center justify-between mb-2 mt-2">
        
      </div>
          
      <div className='flex justify-center items-center rounded-[1.2rem] bg-gradient-to-r from-[#7CBE83] to-[#7B9EBC] w-20 h-20'>
        <div className='text-white text-3xl'>
          {initials.map(value => value).join('').split(' ').join('').substring(0, 2)}
        </div>
      </div>
      
      <button onClick={previewExam} className='bg-[#7B9EBE] hover:bg-[#6e8eac] rounded-xl text-white py-2 px-5 w-full mt-5 transition-all ease-linear delay-[.4ms]'>
        Open
      </button>
    </div>
  )
}
function Exams() {
  const [exams, setExams] = useRecoilState(examsState)
  const isSidebarVisible = useRecoilValue(sidebarState)
  const navigate = useNavigate()
  
  //* Get all exams on initial render
  useEffect(() => {
    const getExams = async () => {
        try {
            const { _id } = await getUserData()
            const exams = await axios.get(EXAMS_URI.concat(`/all/${_id}`))
            
            let fetchedExams = exams.data.map(data => {
                return { id: data._id, title: data.title, questions: data.questions, groups: data.groups, isPublished: data.isPublished }
            })
            
            setExams(fetchedExams)
        } catch (error) {
            throw new Error(error)
        }
    }
    getExams()
  }, [])

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='w-full px-5'>
          <h1 className='text-white text-2xl font-bold'>Exams</h1>
        </div>
        <div className={`button-search flex flex-col ${isSidebarVisible ? 'md:flex-col' : 'md:flex-row md:justify-between'} gap-4 sm:justify-center lg:justify-between lg:flex-row items-center w-full px-5`}>
          <div className='max-w-[700px]'>
            <button onClick={() => navigate('/faculty/exams/form')} className='relative flex justify-center items-center btn-create shadow-lg rounded-2xl px-7 py-4 font-semibold'>
              <IoAddCircleOutline className='absolute left-6 text-white text-4xl'/>
              <span className='ml-20 mr-3'>Create New Exam</span>
            </button>
          </div>
            
          <div className="flex relative shadow-lg max-w-[277px] min-h-[56px]">
            <input type="text" id="email-with-icon" className=" rounded-l-2xl flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:border-[#e2a591] focus:border-[#DBA390] focus:border-transparent" name="search-exam" placeholder="Search Exam"/>
            <span className="bg-[#7B9EBE] rounded-r-2xl inline-flex cursor-pointer items-center px-5 text-gray-500 shadow-sm text-sm">
              <IoSearchOutline className='text-white text-2xl m-0 border-[#7B9EBE]'/>
            </span>
          </div>
        </div>
        
        <div className="relative w-full h-full p-5 mb-24">
          <div className="grid grid-rows-2 gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center items-center ease-in-out duration-300">
          {exams.map(exam => {
              return <ExamCard _id={exam.id} key={exam.id} title={exam.title} noOfQuestions={exam.questions.length + exam.groups.length} isPublished={exam.isPublished}/>
          })}
          </div>
        </div> 
      </div>
    </>
  )
}

export default Exams
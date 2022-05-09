import React, { useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component';
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import './Reports.css'
import { useReactToPrint } from 'react-to-print'
import {TOSTemplate} from './TOSTemplate'

//* GET and POST method
//* POST for adding exam
//* GET for getting all exams
const EXAMS_URI = 'http://localhost:7771/api/exams'

const examsState = atom({
  key: 'reportsExamsState',
  default: []
})

const customStyles = {
  headCells: {
      style: {
        maxWidth: '300px !important'
      },
  },
  cells: {
      style: {
        maxWidth: '300px !important'
      },
  },
};



function ReportsDataTable() {
  const examData = useRecoilValue(examsState)
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const columns = [
    {
      name: 'Exam Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Questions',
      selector: row => row.noOfQuestions,
    },
    {
      name: 'Published',
      selector: row => row.isPublished,
    },
    {
      name: 'Action',
      cell: (row) => <button className='bg-[#7B9EBC] py-1 px-5 rounded-full text-white w-[150px]' onClick={generate2dTOS} id={row.id}>Generate 2D TOS</button>,
      button: true,
    },
  ];

  const generate2dTOS = (state) => {
    console.log('generate!', state.target.id);
    console.log(examData);
    handlePrint()
  }
  
  return(
    <>
      <DataTable  
        title='Exam List'
        columns={columns}
        data={examData}
        direction="ltr"
        customStyles={customStyles}
        pagination
        responsive
      />
      <div style={{ display: "none" }}>
        <TOSTemplate ref={componentRef}/>
      </div>
    </>
  )
}
function Reports() {
  const [exams, setExams] = useRecoilState(examsState)

  //* Get all exams on initial render
  useEffect(() => {
    const getExams = async () => {
        try {
            const exams = await axios.get(EXAMS_URI)
            
            let fetchedExams = exams.data.map(data => {
                return { 
                  id: data._id, 
                  title: data.title, 
                  noOfQuestions: data.questions.length + data.groups.length, 
                  questions: data.questions.concat(data.groups), 
                  isPublished: data.isPublished.toString() === 'true' ? 'Yes' : 'No' 
                }
            })
            
            setExams(fetchedExams)
        } catch (error) {
            throw new Error(error)
        }
    }
    getExams()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full px-5'>
        <h1 className='text-white text-2xl font-bold'>Reports</h1>
      </div>
      <div className='w-[90%] mx-auto'>
        <ReportsDataTable/>
      </div>
    </div>
  )
}

export default Reports
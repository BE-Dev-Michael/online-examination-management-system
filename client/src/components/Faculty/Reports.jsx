import React, { useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import axios from 'axios'
import './Reports.css'
import { useReactToPrint } from 'react-to-print'
import { ReportTemplate } from './ReportTemplate'
import getUserData from '../Auth/authService';

const REPORTS_URI = `${process.env.REACT_APP_BASE_URL}/api/reports`

const examAndQuestionsState = atom({
  key: 'examAndQuestionsState',
  default: []
})
const reportDetailsState = atom({
  key: 'reportDetailsState',
  default: {
    title: null,
    questions: []
  }
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
  const data = useRecoilValue(examAndQuestionsState)
  const [reportDetails, setReportDetails] = useRecoilState(reportDetailsState)
  const resetReportDetails = useResetRecoilState(reportDetailsState)
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => resetReportDetails(),
    pageStyle: "@page {  margin: 20mm; }",
    documentTitle: reportDetails.title
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
      cell: (row) => <button className='bg-[#7B9EBC] py-1 px-5 rounded-full text-white w-[150px]' onClick={() => generateExam(row.title, row.questions)}>Generate Exam</button>,
      button: true,
    },
  ];

  useEffect(() => {
    if (reportDetails.title !== null) {
      handlePrint()
    }
  }, [reportDetails])
  

  const generateExam = (title, questions) => {
    setReportDetails({...reportDetails, title: title, questions: questions})
  }


  const tableData = {
    columns,
    data,
    print: false,
    export: false
  };
  
  return(
    <div className='bg-white'>
      <DataTableExtensions {...tableData}>
        <DataTable  
          columns={columns}
          data={data}
          direction="ltr"
          customStyles={customStyles}
          pagination
          responsive
        />
      </DataTableExtensions>
      <div style={{ display: "none" }}>
        <ReportTemplate details={reportDetails} ref={componentRef}/>
      </div>
    </div>
  )
}
function Reports() {
  const [examAndQuestions, setExamAndQuestions] = useRecoilState(examAndQuestionsState)

  //* Get all exams on initial render
  useEffect(() => {
    const getExamAndQuestions = async () => {
        try {
            const { _id } = await getUserData()
            const exams = await axios.get(REPORTS_URI.concat(`/${_id}`))
            
            let fetchedExams = exams.data.map(data => {
                return { 
                  id: data._id, 
                  title: data.title, 
                  noOfQuestions: data.questions.length + data.groups.length, 
                  questions: data.questions.concat(data.groups), 
                  isPublished: data.isPublished.toString() === 'true' ? 'Yes' : 'No' 
                }
            })
            
            setExamAndQuestions(fetchedExams)
        } catch (error) {
            throw new Error(error)
        }
    }
    getExamAndQuestions()
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
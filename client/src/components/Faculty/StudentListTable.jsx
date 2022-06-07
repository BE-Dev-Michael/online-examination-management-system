import React, { useState, useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { StudentListTemplate } from './StudentListTemplate'
import { IoMdPrint } from 'react-icons/io'

const RESULT_URL = `${ process.env.REACT_APP_BASE_URL }/api/result`

const studentResultByExamState = atom({
  key: 'studentResultByExamState',
  default: []
})
const printBooleanState = atom({
  key: 'printBooleanState',
  default: false
})

function StudentDataTable() {
  const data = useRecoilValue(studentResultByExamState)
  const [isPrint, setIsPrint] = useRecoilState(printBooleanState)
  const [selectedRowData, setSelectedRowData] = useState([])
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPrint(!isPrint),
    pageStyle: "@page {  margin: 20mm; }",
    documentTitle: `Student Exam Results for ${data[0]?.exam.title}`
  })
  const [selectedCount, setSelectedCount] = useState(0)

  const columns = [
    {
      name: 'Student',
      cell: (row) => <Link to={'/faculty/result/view'} state={{result: row}} className='text-[#6590E5] underline underline-offset-2'>{row.student.fullName}</Link>,
      sortable: true,
    },
    {
      name: 'Time Spent',
      selector: row => parseInt(row.timeSpent) < 1 ? 'less than 1 minute' : 
      parseInt(row.timeSpent) === 1 ? `${row.timeSpent} minute` : `${row.timeSpent} minutes`,
      sortable: true,
    },
    {
      name: 'Completed Date',
      selector: row => row.completedDate,
      sortable: true,
    },
    {
      name: 'Score',
      selector: row => row.score,
      sortable: true,
    },
    {
      name: 'Remark',
      selector: row => row.remark,
      sortable: true,
    },
    {
      name: 'Equivalent %',
      selector: row => `${row.percentage}%`,
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
    print: false,
    export: false
  };

  const handleChange = ({ selectedRows }) => {
    console.log('Selected Rows: ', selectedRows);
    setSelectedCount(selectedRows.length)
    if (selectedRows.length === 0) {
      setSelectedRowData(data)
    } else {
      setSelectedRowData(selectedRows)
    }
  };

  useEffect(() => {
      if (isPrint === true) {
        if (selectedCount === 0) {
          alert('Please select the row that you want to print.')
          setIsPrint(!isPrint)
        } else {
          handlePrint()
        }
      }
  }, [isPrint])
  

  return(
    <div className='bg-white'>
      <DataTableExtensions {...tableData}>
        <DataTable  
          columns={columns}
          data={data}
          direction="ltr"
          selectableRows
          onSelectedRowsChange={handleChange}
          pagination
          responsive
        />
      </DataTableExtensions>
      <div style={{ display: "none" }}>
        <StudentListTemplate details={selectedRowData} ref={componentRef}/>
      </div>
    </div>
  )
}
function StudentListTable() {
  const location = useLocation()
  const id  = location.state.id
  const title = location.state.title
  const [result, setResult] = useRecoilState(studentResultByExamState)
  const [isPrint, setIsPrint] = useRecoilState(printBooleanState)
  const resetResultState = useResetRecoilState(studentResultByExamState)

  useEffect(() => {
    console.log('fetch');
   const fetchExamResult = async () => {
      const resultData = await axios.get(RESULT_URL.concat(`/exam/${id}`))
      console.log(resultData.data)
      setResult(resultData.data)
   }  
   fetchExamResult()
  }, [])

  
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full px-16'>
        <h1 className='text-white text-2xl font-bold'>Exam Results for {title}</h1>
        <button onClick={() => setIsPrint(!isPrint)} className='flex gap-2 items-center px-5 py-2 bg-[#7DD1DA] text-white rounded-lg'>
          <IoMdPrint/>
          Print
        </button>
      </div>
      <div className='w-[90%] mx-auto'>
        {result && <StudentDataTable/>}
      </div>
    </div>
  )
}

export default StudentListTable
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'

const RESULT_URL = `${ process.env.REACT_APP_BASE_URL }/api/result`

const studentResultByExamState = atom({
  key: 'studentResultByExamState',
  default: []
})

function StudentDataTable() {
  const data = useRecoilValue(studentResultByExamState)

  const columns = [
    {
      name: 'Student',
      cell: (row) => <Link to={'/faculty/result/view'} state={{result: row}} className='text-[#6590E5] underline underline-offset-2'>{row.student.username}</Link>,
      sortable: true,
    },
    {
      name: 'Time Spent',
      selector: row => parseInt(row.timeSpent) < 1 ? 'less than 1 minute' : 
      parseInt(row.timeSpent) === 1 ? `${row.timeSpent} minute` : `${row.timeSpent} minutes`,
    },
    {
      name: 'Completed Date',
      selector: row => row.completedDate,
    },
    {
      name: 'Score',
      selector: row => row.score,
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
  };

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
    </div>
  )
}
function StudentListTable() {
  const location = useLocation()
  const id = location.state.id
  const [, setResult] = useRecoilState(studentResultByExamState)

  useEffect(() => {
   const fetchExamResult = async () => {
      const resultData = await axios.get(RESULT_URL.concat(`/exam/${id}`))
      setResult(resultData.data)
   }  
   fetchExamResult()
  }, [])
  

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center w-full px-16'>
        <h1 className='text-white text-2xl font-bold'>Student Exam Result</h1>
        <div className='flex gap-4'>
          <button className='px-5 py-2 bg-green-700 text-white rounded-lg'>Export to Excel</button>
          <button className='px-5 py-2 bg-blue-600 text-white rounded-lg'>Print</button>
        </div>
      </div>
      <div className='w-[90%] mx-auto'>
        <StudentDataTable/>
      </div>
    </div>
  )
}

export default StudentListTable
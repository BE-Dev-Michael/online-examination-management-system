import React from 'react'
import DataTable from 'react-data-table-component';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

function StudentDataTable() {

  const columns = [
    {
      name: 'Student',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Time Spent',
      selector: row => row.timeSpent,
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

  const handleChange = ({ selectedRows }) => {
    console.log('Selected Rows: ', selectedRows);
  };

  return(
    <>
      <DataTable  
        columns={columns}
        data={[{username: 'sungjinwoo', timeSpent: '1 minute', completedDate: 'sample', score: '10'}, 
        {username: 'sungjinwoo2', timeSpent: '1 minute', completedDate: 'sample2', score: '7'}]}
        direction="ltr"
        selectableRows
        onSelectedRowsChange={handleChange}
        pagination
        responsive
      />
    </>
  )
}
function StudentListTable() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full px-5'>
        <h1 className='text-white text-2xl font-bold'>Student Exam Result</h1>
      </div>
      <div className='w-[90%] mx-auto'>
        <StudentDataTable/>
      </div>
    </div>
  )
}

export default StudentListTable
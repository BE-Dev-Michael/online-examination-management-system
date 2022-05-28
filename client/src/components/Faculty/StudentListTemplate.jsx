import React, { useState } from 'react'
import logo from '../../assets/images/logo-c.png'

export const StudentListTemplate = React.forwardRef((props, ref) => {
   
    return(
      <>
        {props.details &&
          <div ref={ref} className='relative'>
            <div className='tos-div'>
              <div className='flex justify-center items-center m-5'>
                <img src={logo} alt="" width={120}/>
              </div>
              <div className='flex flex-col gap-1 justify-center items-center m-5'>
                <h1 className='font-bold'>Student Exam Results for {props.details[0]?.exam.title}</h1>
              </div>
              <table width='100%'>
                <tr>
                  <th>Student</th>
                  <th>Time Spent</th>
                  <th>Completed Date</th>
                  <th>Score</th>
                  <th>Remark</th>
                  <th>Equivalent %</th>
                </tr>
                {props.details.map(data => {
                  return  <tr>
                            <td>{data.student.username}</td>
                            <td>
                              {parseInt(data.timeSpent) < 1 ? 'less than 1 minute' : 
                              parseInt(data.timeSpent) === 1 ? `${data.timeSpent} minute` : `${data.timeSpent} minutes`}
                            </td>
                            <td>{data.completedDate}</td>
                            <td>{data.score}</td>
                            <td>{data.remark}</td>
                            <td>{`${data.percentage}%`}</td>
                          </tr>
                })}
                
              </table>
              <div className='flex justify-center items-center text-sm mt-5 border border-black rounded-sm'>
                Date Generated: {new Date().toLocaleString('en-US', 
                { 
                  month: 'short', 
                  day: 'numeric', 
                  weekday: 'short', 
                  year: 'numeric', 
                  hour: 'numeric', 
                  minute: 'numeric'
                })}
              </div>
            </div>
          </div>
        }
      </>
    )
})

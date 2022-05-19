import React, { useState, useEffect } from 'react'
import ResultCard from './ResultCard'
import getUserData from '../Auth/authService'
import axios from 'axios'

const RESULT_URL = `${process.env.REACT_APP_BASE_URL}/api/result` 

const Activityboard = () => {
    const [examResult, setExamResult] = useState()
    // sample data just for display
    const result = [{
        score: 45,
        remark: "Passed"
    }, {
        score: 25,
        remark: "Failed"
    }, {
        score: 45,
        remark: "Passed"
    }, {
        score: 45,
        remark: "Passed"
    }, {
        score: 25,
        remark: "Failed"
    }]

    useEffect(() => {
        const fetchExamResult = async () => {
            const { _id } = await getUserData()
            const response = await axios.get(RESULT_URL.concat(`/all/${_id}`))
            setExamResult(response.data)
        }
        fetchExamResult()
    }, [])


    return (
      <>
        {examResult &&
          <div className=" relative h-full w-screen mx-5 mb-5 rounded-2xl shadow-md border bg-white dark:bg-[#1e2027] dark:border-[#292d35]">
            <p className="ml-9 mt-4 text-xl font-bold text-gray6500 dark:text-gray-300">Recent Exams</p>
            <div className='flex justify-center'>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-10 p-5 ">
                {examResult ?
                    <>
                        {examResult.map((result, index) => {
                            return <ResultCard result={result} key={result._id} ></ResultCard>
                        })}
                    </>
                    : <div className="h-96 flex items-center">
                        <p>There are no exam to display. </p>
                    </div>}
              </div>
            </div>
          </div>
       }
      </>
    )
}

export default Activityboard
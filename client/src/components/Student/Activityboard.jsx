import React, { useState, useEffect } from 'react'
import ResultCard from './ResultCard'
import getUserData from '../Auth/authService'
import axios from 'axios'

const RESULT_URL = `${ process.env.REACT_APP_BASE_URL }/api/result`

const Activityboard = () => {
    const [examResult, setExamResult] = useState()

    useEffect(() => {
        const fetchExamResult = async () => {
            const { _id } = await getUserData()
            const response = await axios.get(RESULT_URL.concat(`/all/${ _id }`))
            setExamResult(response.data)
        }
        fetchExamResult()
    }, [])

    return (
        <div className=" relative h-full w-screen mx-5 mb-5 rounded-2xl shadow-md border bg-white dark:bg-[#1e2027] dark:border-[#292d35]">
            <p className="ml-9 mt-4 text-xl font-bold text-gray-600 dark:text-gray-300">Recent Exams</p>
            <div className='flex justify-center py-5'>
                {examResult && <>
                    {Object.keys(examResult).length !== 0 ?
                        <>
                            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-10 px-5 ">
                                {examResult.map((result, index) => {
                                    return <ResultCard result={result} key={result._id} ></ResultCard>
                                })}
                            </div>
                        </>
                        : <div className="flex text-lg font-lato h-96 items-center justify-center dark:text-[#e2dddd]">
                            <p>There are no exams to display. </p>
                        </div>}
                </>}
            </div>
        </div>
    )
}

export default Activityboard
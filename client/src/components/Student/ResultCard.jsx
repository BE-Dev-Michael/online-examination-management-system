import React from 'react'
import { Link } from 'react-router-dom';

const ResultCard = ({ result }) => {
    return (
        <div className="shadow-lg rounded-xl max-w-xs p-4 border bg-white relative overflow-hidden dark:bg-[#26292F] dark:border-none">
            <div className="w-full h-full block">

                <p className="text-gray-800 text-xl font-medium mb-1 dark:text-[#e2dddd]">
                    Midterm Examination in Programming 1
                </p>

                <div className="dark:text-[#e2dddd]">
                    <p>
                        <strong className="text-gray-500 dark:text-white">Score: </strong>
                        <strong className={`text-xl ${ result.remark === "Passed" ? 'text-green-500' : 'text-red-500' } `}>{result.score}</strong>
                        <strong> / 60</strong>
                    </p>

                    <p>
                        <strong className="text-gray-500 dark:text-white">Remark: </strong>
                        <strong className={`text-xl ${ result.remark === "Passed" ? 'text-green-500' : 'text-red-500' } `}>{result.remark}</strong>
                    </p>

                    <p className="mb-2">
                        <strong className="text-gray-500 dark:text-white">Completed: </strong>
                        15 May 2022 13:27
                    </p>
                </div>



                <Link to={`/student/activity/result`}>
                    <button type="button" className="py-2 px-4  bg-[#7B9EBE] hover:bg-[#6e8eac] focus:ring-[#7B9EBE] focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                        View
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ResultCard
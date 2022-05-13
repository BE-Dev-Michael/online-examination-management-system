import React from 'react'
import { Link } from 'react-router-dom';

// Example exam card
const ExamCard = () => {
    return (
        <div className="shadow-lg rounded-xl max-w-xs p-4 border bg-white relative overflow-hidden">
            <a href="#" className="w-full h-full block">
                <div className="w-full">

                    <p className="text-gray-800 text-xl font-medium mb-2">
                        Midterm Examination in Programming 1
                    </p>

                    <p className="text-gray-400 text-xs font-medium mb-2">
                        Time limit: 1:30:00
                    </p>

                    <p className="text-gray-400 text-xs font-medium mb-2">
                        May 13, 2022 8:00 AM to May 15, 2022 8:00 PM
                    </p>


                    <div className="relative">
                        <p className="text-gray-400 text-sm mb-4 line-clamp-6 whitespace-pre-line">
                            You’ve been coding for a while now and know your way around a CSS file. You’re certainly no master, but with enough fiddling you can get where you want to go.
                        </p>
                    </div>



                    <Link to={`/student/examination`}>  {/* to={`/student/examination/${ props.id }`}  */}
                        <button type="button" className="py-2 px-4  bg-[#7B9EBE] hover:bg-[#6e8eac] focus:ring-[#7B9EBE] focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Take exam
                        </button>
                    </Link>
                </div>
            </a>
        </div>
    )
}

export default ExamCard
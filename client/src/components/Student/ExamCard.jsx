import React from 'react'
import { useNavigate } from 'react-router-dom';

// Example exam card
const ExamCard = (props) => {
    let points = props.questions.map(data => data.points)
    //* Get the sum of all points in array
    let totalPoints = points.reduce((prev, curr) => prev + curr, 0)
    const navigate = useNavigate()

    return (
        <div className="shadow-lg rounded-xl max-w-xs p-4 border bg-white relative overflow-hidden dark:bg-[#26292F] dark:border-none">
            <a href="#" className="w-full h-full block">
                <div className="w-full">

                    <p className="text-gray-800 text-xl font-medium mb-2 dark:text-white">
                        {props.title}
                    </p>

                    <div className="text-gray-400 dark:text-gray-300">
                        <p className="text-xs font-medium mb-2">
                            Time limit: {props.timeLimit} minutes
                        </p>

                        <p className="text-xs font-medium mb-2">
                            Available from {props.startDate} to {props.endDate}
                        </p>

                        <p className="text-xs font-medium mb-2">
                            Points: {totalPoints}
                        </p>
                    </div>



                    <button onClick={() => navigate(`/student/examination/${ props.id }`)} type="button" className="py-2 px-4  bg-[#7B9EBE] hover:bg-[#6e8eac] focus:ring-[#7B9EBE] focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Take exam
                    </button>
                </div>
            </a>
        </div>
    )
}

export default ExamCard
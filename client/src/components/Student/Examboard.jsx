import React from 'react'
import InputCode from './InputCode'
import ExamCard from './ExamCard'

const Examboard = () => {
    return (
        <div className="lg:flex lg:flex-row-reverse flex-col justify-center  h-full w-screen mx-5">
            <InputCode />

            <div className="relative w-full shadow-sm border bg-white rounded-2xl">
                <p className="ml-9 mt-4 text-xl font-bold text-gray-500">Available Exams</p>

                <div className="flex flex-wrap gap-4 p-5 justify-center">
                    <ExamCard />
                    <ExamCard />
                    <ExamCard />
                </div>
            </div>
        </div>
    )
}

export default Examboard
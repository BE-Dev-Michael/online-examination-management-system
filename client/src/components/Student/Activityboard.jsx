import React from 'react'
import ResultCard from './ResultCard'


const Activityboard = () => {
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


    return (
        <div className=" relative h-full w-screen mx-5 mb-5 rounded-2xl shadow-md border bg-white dark:bg-[#1e2027] dark:border-[#292d35]">
            <p className="ml-9 mt-4 text-xl font-bold text-gray-500">Recent Exams</p>
            <div className='flex justify-center'>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-10 p-5 ">
                    {result ?
                        <>
                            {result.map((result, index) => {
                                return <ResultCard result={result} key={index} ></ResultCard>
                            })}
                        </>
                        : <div className="h-96 flex items-center">
                            <p>There are no exam to display. </p>
                        </div>}
                </div>
            </div>
        </div >
    )
}

export default Activityboard
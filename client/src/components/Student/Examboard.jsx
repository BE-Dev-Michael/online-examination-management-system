import { useEffect, useState } from 'react'
import InputCode from './InputCode'
import ExamCard from './ExamCard'
import axios from 'axios'
import getUserData from '../Auth/authService'

const EXAM_URL = `${ process.env.REACT_APP_BASE_URL }/api/exams/student`
const RESULT_URL = `${ process.env.REACT_APP_BASE_URL }/api/result`

const Examboard = () => {
    const [exams, setExams] = useState([])

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const { _id } = await getUserData()
                const response = await axios.get(EXAM_URL.concat(`/${ _id }`));
                //* Get exam result of specific student
                const resultData = await axios.get(RESULT_URL.concat(`/all/${ _id }`))
                //* Store all exam ids 
                //! This is for identifying the exam that was already completed by a student
                const completedExamIds = resultData.data.map(data => data.exam._id)
                //* Filter only the exam that is not yet taken or completed by a student
                const filteredExam = response.data.filter(data => !completedExamIds.includes(data._id))
                if (filteredExam) {
                    setExams(filteredExam)
                }
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchExam()
    }, [])


    const getExamByCode = async (code) => {
        if (!exams) {
            return
        }
        try {
            const { _id } = await getUserData()
            const response = await axios.post(EXAM_URL, { examCode: code, userId: _id });
            console.log(response.data);
            if (response.data === 1 || response.data === 2) {
                alert('No exam found with the given exam code!')
            } else if (response.data === 3) {
                alert('You have already accessed this exam!')
            } else {
                window.location.reload(false)
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const getExamCodeHandler = (code) => {
        getExamByCode(code)
    }

    return (
        <div className="lg:flex lg:flex-row-reverse flex-col justify-center  h-full w-screen mx-5">
            <InputCode getCodeFunction={getExamCodeHandler} />

            <div className="relative w-full shadow-lg border bg-white rounded-2xl dark:bg-[#1e2027] dark:border-[#292d35]">
                <p className="ml-9 mt-4 text-xl font-bold text-gray-600 dark:text-gray-300">Available Exams</p>
                <div className='flex justify-center'>
                    {Object.keys(exams).length !== 0 ?
                        <div className="grid xl:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-10 p-5 ">
                            {/* This filter is to filter and get the inputed code */}
                            {exams.map((exam, index) => {
                                return <ExamCard
                                    key={exam._id}
                                    id={exam._id}
                                    title={exam.title}
                                    instruction={exam.desc}
                                    timeLimit={exam.timeLimit}
                                    startDate={exam.startDate}
                                    endDate={exam.endDate}
                                    examCode={exam.examCode}
                                    questions={exam.questions.concat(exam.groups)}
                                />
                            })}
                        </div> :
                        <div className="flex text-lg font-lato h-96 items-center justify-center dark:text-[#e2dddd]">
                            <p className='text-center'>There are no exams to display. <br />
                                Enter exam code to get an exam.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Examboard
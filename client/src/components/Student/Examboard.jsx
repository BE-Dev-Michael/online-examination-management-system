import { useEffect, useState } from 'react'
import InputCode from './InputCode'
import ExamCard from './ExamCard'
import axios from 'axios'
import getUserData from '../Auth/authService'

const EXAM_URL = `${process.env.REACT_APP_BASE_URL}/api/exams/student`

const Examboard = () => {
    const [exams, setExams] = useState([])

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const { _id } = await getUserData()
                const response = await axios.get(EXAM_URL.concat(`/${_id}`));
                setExams(response.data)
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
            const response = await axios.post(EXAM_URL, {examCode: code, userId: _id});
            console.log(response.data);
            if (response.data === 1 || response.data === 2) {
                alert('No exam found with the given exam code!')
            } else if(response.data === 3) {
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

            <div className="relative w-full shadow-sm border bg-white rounded-2xl">
                <p className="ml-9 mt-4 text-xl font-bold text-gray-500">Available Exams</p>

                <div className="flex flex-wrap gap-4 p-5 justify-center">
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

                </div>
            </div>
        </div>
    )
}

export default Examboard
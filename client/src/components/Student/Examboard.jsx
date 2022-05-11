import { useEffect, useState } from 'react'
import InputCode from './InputCode'
import ExamCard from './ExamCard'
import axios from 'axios'

const Examboard = () => {
    const [exams, setExams] = useState([])
    const [examCode, setExamCode] = useState("")

    useEffect(() => {
        const fetchExams = async () => {
            try {
                // change the url with the real examination url
                const response = await axios.get("http://localhost:3000/examination");
                setExams(response.data)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchExams()
    }, [])

    const getExamCodeHandler = (code) => {
        setExamCode(code)
    }

    return (
        <div className="lg:flex lg:flex-row-reverse flex-col justify-center  h-full w-screen mx-5">
            <InputCode getCodeFunction={getExamCodeHandler} />

            <div className="relative w-full shadow-sm border bg-white rounded-2xl">
                <p className="ml-9 mt-4 text-xl font-bold text-gray-500">Available Exams</p>

                <div className="flex flex-wrap gap-4 p-5 justify-center">
                    <ExamCard />
                    <ExamCard />
                    <ExamCard />

                    {/* This filter is to filter and get the inputed code */}
                    {/* {exams.filter(exam => exam.examCode === examCode).map((exam, index) => {
                        return <ExamCard key={index} id={exam.id} title={exam.title} instruction={exam.instruction} time={exam.limit} question={exam.questions} />
                    })} */}

                </div>
            </div>
        </div>
    )
}

export default Examboard
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from "axios"

function Instruction({ exam }) {
    return (
        <div className="relative lg:flex justify-center w-10/12 lg:w-8/12">
            <div className="flex flex-col my-5 lg:w-11/12 border p-5 rounded-lg shadow-md">
                <div className="flex flex-col" >
                    <p className="font-semibold text-2xl mb-2 flex self-center">Exam Title</p>
                    <p><strong>Number of questions: </strong>Exam number of question</p>
                    <p><strong>Total points: </strong>Exam total points</p>
                    <p><strong>Time limt: </strong>1:30:00</p>
                    <p><strong>Availability: </strong>May 13, 2022 8:00 AM to May 15, 2022 8:00 PM</p>

                    <p className="leading-6 tracking-tight whitespace-pre-line mt-3"><strong>Instruction</strong><br />
                        Exam Description
                    </p>
                </div>

                <form >
                    <div className="flex justify-center my-5">
                        {/* <Link to={`/student/examination/${ exam.id }`}> */}
                        <button
                            type="submit"
                            className={`w-52 py-2 px-4 bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full`}>
                            Start
                        </button>
                        {/* </Link> */}
                    </div>
                </form>

            </div>
        </div>
    )
}

const Examboard = () => {
    const [exam, setExam] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/examination/${ params.id }`);
                setExam(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchExams()
    }, [])


    return (
        <div className="flex-col justify-center h-full w-screen mx-5">
            <div className="relative flex justify-center w-full shadow-sm border bg-white rounded-2xl">
                {loading ? <>Loading...</> : <Instruction exam={exam} />}

            </div>
        </div>
    )
}

export default Examboard
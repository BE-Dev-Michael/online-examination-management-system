import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from "axios"

const EXAM_URL = `${process.env.REACT_APP_BASE_URL}/api/exams/student`

function Instruction() {
    const { code } = useParams()
    const [exams, setExams] = useState()
    const [totalPoints, setTotalPoints] = useState(0)


    useEffect(() => {
      if (exams) {
        const mergedQuestions = exams.questions.concat(exams.groups)
        const points = mergedQuestions.map(data => data.points)
        //* Get the sum of all points in array
        setTotalPoints(points.reduce((prev, curr) => prev + curr, 0)) 
      }
    }, [exams])
    
    useEffect(() => {
        const fetchExam = async (examCode) => {
            try {
                // change the url with the real examination url
                const response = await axios.get(EXAM_URL.concat(`/${examCode}`));
                console.log(...response.data);
                setExams(...response.data)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchExam(code)
    }, [])
    
    return (
        <>
          {exams &&
            <div className="relative lg:flex justify-center w-10/12 lg:w-8/12">
                <div className="flex flex-col my-5 lg:w-11/12 border p-5 rounded-lg shadow-md">
                    <div className="flex flex-col" >
                        <p className="font-semibold text-2xl mb-2 flex self-center">{exams.title}</p>
                        <p><strong>Number of questions: </strong>{exams.questions.length + exams.groups.length}</p>
                        <p><strong>Total points: </strong>{totalPoints}</p>
                        <p><strong>Time limit: </strong>{exams.timeLimit} minutes</p>
                        <p><strong>Availability: </strong>{exams.startDate} to {exams.endDate}</p>

                        <p className="leading-6 tracking-tight whitespace-pre-line mt-3"><strong>Instruction</strong><br />
                          <div
                            className='mb-4'
                            dangerouslySetInnerHTML={{__html: exams.desc}}
                          />
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
          }
        </>
    )
}

const ExamDescription = () => {
    // const [exam, setExam] = useState([])
    const [loading, setLoading] = useState(false) // true dapat to sa una
    // const params = useParams()

    // useEffect(() => {
    //     const fetchExams = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/examination/${ params.id }`);
    //             setExam(response.data)
    //             setLoading(false)
    //         } catch (error) {
    //             console.log(error.response.data)
    //         }
    //     }
    //     fetchExams()
    // }, [])


    return (
        <div className="flex-col justify-center h-full w-screen mx-5">
            <div className="relative flex justify-center w-full shadow-sm border bg-white rounded-2xl">
                {loading ? <>Loading...</> : <Instruction />} {/* <Instruction exam={exam} />  */}


            </div>
        </div>
    )
}

export default ExamDescription
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { MdInfo } from 'react-icons/md'
import { AiOutlineStop } from 'react-icons/ai'
import getUserData from '../Auth/authService'

const EXAM_URL = `${process.env.REACT_APP_BASE_URL}/api/exams`

function Instruction() {
    const { id } = useParams()
    const [exams, setExams] = useState()
    const [totalPoints, setTotalPoints] = useState(0)
    const navigate = useNavigate()
    const dateFormat = {month: 'short', day: 'numeric', weekday: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}

    console.log(new Date().toLocaleString('en-US', dateFormat))

    useEffect(() => {
      if (exams) {
        const mergedQuestions = exams.questions.concat(exams.groups)
        const points = mergedQuestions.map(data => data.points)
        //* Get the sum of all points in array
        setTotalPoints(points.reduce((prev, curr) => prev + curr, 0)) 
      }
    }, [exams])
    
    useEffect(() => {
        const viewExam = async () => {
            try {
                // change the url with the real examination url
                const response = await axios.get(EXAM_URL.concat(`/${id}`));
                console.log(response.data);
                setExams(response.data)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        viewExam()
    }, [])

    const startExam = () => {
        navigate(`/student/examination/panel/${exams._id}`)
    }
    
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

                    
                    <div className="flex justify-center my-5">
                        {/*  If current date is greater than or equal to start date of exam and 
                             current date is less than or equal to end date of exam then the exam can be taken */}
                        {new Date().toLocaleString('en-US', dateFormat) >= exams.startDate && 
                         new Date().toLocaleString('en-US', dateFormat) <= exams.endDate ?
                          <button
                              onClick={startExam}
                              className={`w-52 py-2 px-4 bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full`}>
                              Start
                          </button>
                          :
                          <div className='flex gap-4'>
                            {new Date().toLocaleString('en-US', dateFormat) < exams.startDate ?
                              <div className='flex gap-4'>
                                <MdInfo className='text-2xl text-green-600'/>
                                <h1 className='font-semibold'>
                                    The exam is not yet available until {exams.startDate}
                                </h1>
                              </div>
                              :
                              <div className='flex gap-4'>
                                <AiOutlineStop className='text-2xl text-red-400'/>
                                <h1 className='font-semibold'>
                                    The exam was closed on {exams.endDate}
                                </h1>
                              </div>
                            }
                          </div>
                        }
                    </div>
                    

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
    //     const viewExams = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/examination/${ params.id }`);
    //             setExam(response.data)
    //             setLoading(false)
    //         } catch (error) {
    //             console.log(error.response.data)
    //         }
    //     }
    //     viewExams()
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
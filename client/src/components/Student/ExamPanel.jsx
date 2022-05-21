// Eto yung panel pag mag eexam na
// Whole page ang sakop neto
// Mag rurun lang dapat to pag clinick yung start button sa exam description

import { useState, useEffect, useRef } from 'react'
import { RiTimerLine } from "react-icons/ri";
import { IoMdCheckmark } from 'react-icons/io'
import { MdOutlineWarning } from 'react-icons/md'
import logo from '../../assets/images/logo-c.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import getUserData from '../Auth/authService'
import { useNavigate } from 'react-router-dom'

const EXAM_URL = `${ process.env.REACT_APP_BASE_URL }/api/exams`
const RESULT_URL = `${ process.env.REACT_APP_BASE_URL }/api/result`

const studentExamState = atom({
  key: 'studentTakeExamState',
  default: null
})

const studentAnswerState = atom({
  key: 'studentAnswerState',
  default: []
})

const correctAnswerState = atom({
  key: 'correctAnswerState',
  default: []
})

const unansweredQuestionState = atom({
  key: 'unansweredQuestionState',
  default: 0
})

const timerStatusState = atom({
  key: 'timerStatusState',
  default: false
})

function ButtonChoices(props) {
  const [answer, setAnswer] = useRecoilState(studentAnswerState)
  const activeClass = 'border-green-300 ring-green-500 ring-offset-green-200 bg-green-300 outline-none ring-2 ring-offset-4'

  useEffect(() => {
    console.log(answer);
  }, [answer])

  const getChoiceValueHandler = (e) => {
    //* Set the answer of student
    const answerCopy = [...answer]
    answerCopy[props.questionNo] = { id: props.id, answer: e.target.value }
    setAnswer(answerCopy)
  }

  return (
    <button
      onClick={getChoiceValueHandler}
      value={props.text}
      type="button"
      className={`font-mont p-3 rounded-xl shadow-sm ${ answer?.[props.questionNo]?.answer === props.text ? activeClass : 'bg-white hover:bg-cyan-500 border-2 border-cyan-300' }`}>
      {props.text}
    </button>
  )
}

function ConfirmationDialog(props) {
  const [, setUnanswered] = useRecoilState(unansweredQuestionState)
  const studentAnswer = useRecoilValue(studentAnswerState)
  const correctAnswer = useRecoilValue(correctAnswerState)
  const [, setStopTimer] = useRecoilState(timerStatusState)
  const examData = useRecoilValue(studentExamState)
  const dateFormat = { month: 'short', day: 'numeric', weekday: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }
  const navigate = useNavigate()

  const forceStopTimer = () => {
    localStorage.removeItem('timer')
    setStopTimer(true)
  }

  const forceSubmitExam = (e) => {
    e.preventDefault()
    setUnanswered(0)
    forceStopTimer()
  }

  return (
    <form onSubmit={forceSubmitExam}>
      <div className="fixed inset-0 z-50">
        <div className='absolute inset-0 bg-black opacity-50 h-screen w-screen' />
        <div className="relative px-4 h-screen flex items-center justify-center">
          <div className="relative w-[40%] bg-white rounded-lg p-4 mx-4">
            <div className="relative w-full h-[30vh] max-h-[30vh] bg-white rounded-lg overflow-auto">
              <div class="flex h-full flex-col justify-between items-center">
                <MdOutlineWarning className='text-yellow-400 text-7xl' />
                <p class="text-gray-800 text-xl font-bold mt-4">
                  Confirmation
                </p>
                <p class="text-gray-600 text-sm py-2 px-6">
                  You have ({props.count}) unanswered {props.count === 1 ? 'question. ' : 'questions. '}
                  Do you wish to continue?
                </p>
                <div class="flex items-center justify-between gap-4 w-full mt-8">
                  <button onClick={() => setUnanswered(0)} type="button" class="py-2 px-4  bg-slate-100 hover:bg-gray-200 focus:ring-indigo-500 focus:ring-offset-indigo-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    No
                  </button>
                  <button type="submit" class="py-2 px-4  bg-cyan-400 hover:bg-cyan-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
const QuestionForm = ({ exam }) => {
  const counter = exam.length; //count the number of question
  const [currentQuestion, setCurrentQuestion] = useState(0) //counter for current question
  const questionList = useRef(new Array()) //* Reference for question list
  const studentAnswer = useRecoilValue(studentAnswerState)
  const correctAnswer = useRecoilValue(correctAnswerState)
  const [unanswered, setUnanswered] = useRecoilState(unansweredQuestionState)
  const isTimerStopped = useRecoilValue(timerStatusState)
  const resetTimer = useResetRecoilState(timerStatusState)
  const submitButtonRef = useRef(null)
  const [, setStopTimer] = useRecoilState(timerStatusState)
  const examData = useRecoilValue(studentExamState)
  const dateFormat = { month: 'short', day: 'numeric', weekday: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }
  const navigate = useNavigate()

  const forceStopTimer = () => {
    localStorage.removeItem('timer')
    setStopTimer(true)
  }

  //* Auto submit the form when timer stops
  useEffect(() => {
    if (isTimerStopped === true) {
      submitButtonRef.current.click()
    }
  }, [isTimerStopped])

  // button for next question
  const nextQuestionHandler = () => {
    if (!(currentQuestion >= counter - 1)) {
      const nextQuestion = currentQuestion + 1;
      //* Magscroll dun sa question list if hindi visible
      questionList.current[nextQuestion].scrollIntoView()
      setCurrentQuestion(nextQuestion)
    }
  }

  // button for previous question
  const previousQuestionHandler = () => {
    if (!(currentQuestion <= 0)) {
      const prevQuestion = currentQuestion - 1;
      //* Magscroll dun sa question list if hindi visible
      questionList.current[prevQuestion].scrollIntoView()
      setCurrentQuestion(prevQuestion)
    }
  }

  // function for link list
  const questionLinkHandler = (e) => {
    const newCurrent = e.target.value
    setCurrentQuestion(newCurrent)
    console.log(newCurrent)
  }

  const countAnsweredQuestion = () => {
    const count = studentAnswer.filter(answer => answer !== undefined)
    return count.length
  }

  const getRemark = (score, totalPoints) => {
    //* Passing score is greater than or equal to half of the total points
    const half = totalPoints / 2
    if (score >= Math.round(half)) {
      return 'Passed'
    } else {
      return 'Failed'
    }
  }

  const getCompletedDate = () => {
    return new Date().toLocaleString('en-US', dateFormat)
  }

  const generateResult = () => {
    forceStopTimer()
    //* Dito mangagaling yung correct answers (Not shuffled)
    const mergedQuestions = examData.questions.concat(examData.groups)

    //* Get shuffled questions 
    //! Correct answers are not included here
    const shuffledQuestions = JSON.parse(localStorage.getItem('questions'))

    //* Question IDs from exam (Not Shuffled)
    const unshuffledIds = mergedQuestions.map(question => question._id)

    //* Returns a new array based on the sequence of shuffled questions including correct answers
    const newShuffledQuestions = shuffledQuestions.map(data => {
      const index = unshuffledIds.indexOf(data._id)
      return mergedQuestions[index]
    })

    //* Put a 'No answer' string if student didn't answered a specific question
    const newStudentAnswer = shuffledQuestions.map((data, index) => {
      if (studentAnswer[index] === undefined) {
        return { id: data._id, answer: 'No answer' }
      }
      return studentAnswer[index]
    })

    //* Compare the answer of student to correct answer
    const arrayPoints = newShuffledQuestions.map((question, index) => {
      if (question.answer === newStudentAnswer[index].answer) {
        //* Return points of question per correct answer
        return question.points
      }
      //* Return 0 if incorrect answer
      return 0
    })

    //* Sum up the score
    const score = arrayPoints.reduce((prev, curr) => prev + curr, 0)
    const points = mergedQuestions.map(data => data.points)
    const totalPoints = points.reduce((prev, curr) => prev + curr, 0)
    console.log(score);

    //* Get the remark. Passing score is greater than or equal to half of total points
    const remark = getRemark(score, totalPoints)

    //* Get yung date kung kelan natapos mag exam si student
    const completedDate = getCompletedDate()

    //* Get correct answers
    const correctAnswers = newShuffledQuestions.map(data => data.answer)

    //* Unset questions from local storage
    localStorage.removeItem('questions')

    return {
      score: score,
      remark: remark,
      completedDate: completedDate,
      answers: newStudentAnswer,
      correctAnswers: correctAnswers
    }
  }

  const sendExamResult = async (obj) => {
    const { score, remark, completedDate, answers, correctAnswers } = obj

    try {
      const { _id } = await getUserData()
      const resultData = await axios.post(RESULT_URL, {
        score: score,
        remark: remark,
        completedDate: completedDate,
        answers: answers,
        correctAnswers: correctAnswers,
        examId: examData._id,
        userId: _id
      })
      console.log(resultData);
      navigate('/student/activity')
    } catch (error) {

    }
  }

  const submitExam = (e) => {
    e.preventDefault()
    console.log('submit');
    if (isTimerStopped === true) {
      let resultObj = generateResult()
      resetTimer()
      sendExamResult(resultObj)
      return
    }

    const answeredCount = countAnsweredQuestion()
    if (answeredCount !== examData.questions.concat(examData.groups).length) {
      const unansweredCount = examData.questions.concat(examData.groups).length - answeredCount
      setUnanswered(unansweredCount)
    } else {
      let resultObj = generateResult()
      sendExamResult(resultObj)
    }
  }

  return (
    <>
      <form onSubmit={submitExam}>
        <div className="relative flex flex-col justify-center align-middle items-center px-10">
          {/* Question form */}
          <div className="relative h-full lg:w-3/4 md:w-3/4 w-full flex flex-col mt-32 mx-10 border bg-white rounded-md shadow-lg">
            <div className="p-10 font-roboto">
              <p className='border-b-4 border-cyan-300 w-fit'>{currentQuestion + 1} of {counter}</p>
            </div>

            <div className="pb-10 px-5">
              {/* Question */}
              <div className="text-center mb-5 font-roboto">
                <p className="text-xl">{exam[currentQuestion].question}</p>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-2 grid-flow-row gap-5 px-5 py-10 lg:px-20 bg-slate-100 rounded-sm" role='group'>

                {exam[currentQuestion].choices.map((choice, index) => {
                  return <ButtonChoices id={exam[currentQuestion]._id} key={index} questionNo={currentQuestion} text={choice} />
                })}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 w-96 mt-5 text-white font-mont">
            <button type='button' onClick={previousQuestionHandler} className="bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-600 p-2 w-24 rounded">Previous</button>
            <button type='button' onClick={nextQuestionHandler} className="bg-green-400 shadow-lg shadow-green-500/50 hover:bg-green-500 p-2 w-24 rounded">Next</button>
          </div>
          <div className='flex justify-center mt-12 border rounded-md p-5'>
            <button ref={submitButtonRef} type='submit' className='px-12 py-2 text-white bg-cyan-400 rounded-md shadow-md hover:bg-cyan-500'>Submit</button>
          </div>
        </div>
      </form>


      {/* Link list */}
      <div className="xl:absolute xl:right-0 xl:top-16  flex justify-center -ml-16 xl:mt-32 pr-3">
        <div className="relative  xl:w-44 w-3/5 xl:h-48 h-28 overflow-y-scroll px-2 my-5 border">
          <ul>
            {Object.keys(exam).map((item, index) => {
              return <div className='flex gap-4 items-center'>
                <li
                  ref={(el) => questionList.current.push(el)}
                  className={`${ currentQuestion === index ? 'text-cyan-400' : '' } font-medium font-lato cursor-pointer hover:underline underline-offset-4 hover:text-cyan-500`}
                  onClick={questionLinkHandler}
                  key={index}
                  value={index}>Question {index + 1}
                </li>
                {studentAnswer[index] ? <IoMdCheckmark className='text-green-500' /> : ''}
              </div>
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

function Timer({ hoursMinSecs }) {
  const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  const [stopTimer, setStopTimer] = useRecoilState(timerStatusState)


  const tick = () => {

    if (hrs === 0 && mins === 0 && secs === 0)
      stopTimerHandler()
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };


  const stopTimerHandler = () => {
    localStorage.removeItem('timer')
    setStopTimer(true)
  }


  useEffect(() => {
    const timerId = setInterval(() => {
      tick()
      //* I-update yung data for timer sa local storage every second
      localStorage.setItem('timer', JSON.stringify({ hours: hrs, minutes: mins, seconds: secs }))
    }, 1000);
    if (stopTimer === true) {
      clearInterval(timerId)
    }
    return () => clearInterval(timerId);
  });


  return (
    <div>
      <p>{`${ hrs.toString().padStart(2, '0') }:${ mins
        .toString()
        .padStart(2, '0') }:${ secs.toString().padStart(2, '0') }`}</p>
    </div>
  );
}

const ExamPanel = () => {
  const { id } = useParams()
  const [exam, setExam] = useRecoilState(studentExamState)
  const [correctAnswer, setCorrectAnswer] = useRecoilState(correctAnswerState)
  const unansweredCount = useRecoilValue(unansweredQuestionState)

  const getTimeLimit = () => {
    const isTimerStarted = localStorage.getItem('timer')
    //* If hindi pa naseset yung timer data sa local storage
    if (!isTimerStarted) {
      const mins = exam.timeLimit
      const minutes = mins % 60;
      const hours = Math.floor(mins / 60);
      //* Uncomment this line to simulate the auto submission of form when the timer stops
      // const hoursMinSecs = { hours: 0, minutes: 0, seconds: 10 }
      const hoursMinSecs = { hours: hours, minutes: minutes, seconds: 0 }
      localStorage.setItem('timer', JSON.stringify(hoursMinSecs))
      const timer = localStorage.getItem('timer')
      return JSON.parse(timer)
    }
    //* Kuhanin yung persistent timer data sa local storage para kahit i-refresh yung page
    //* hindi magrereset yung timer
    const stringTimer = localStorage.getItem('timer')
    const timer = JSON.parse(stringTimer)
    //* Decrement to fix yung pagdagdag ng 1 second kapag nirefresh yung page
    timer.seconds--
    return timer
  }

  const getShuffledQuestions = () => {
    const shuffledQuestions = localStorage.getItem('questions')
    if (!shuffledQuestions) {
      //* Merged array of questions
      const mergedQuestions = exam.questions.concat(exam.groups)
      const questions = mergedQuestions.map(data => {
        return { _id: data._id, question: data.question, choices: data.choices }
      })
      //* Shuffle questions
      questions.sort(() => Math.random() - 0.5);
      localStorage.setItem('questions', JSON.stringify(questions))
      console.log(questions);
      return questions
    }
    return JSON.parse(localStorage.getItem('questions'))
  }

  useEffect(() => {
    const fetchExam = async () => {
      try {
        // change the url with the real examination url
        const response = await axios.get(EXAM_URL.concat(`/${ id }`));
        console.log(response.data);
        setExam(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchExam()
  }, [])

  return (
    <>
      {exam &&
        <>
          <div className="flex justify-center ">
            <div className="relative lg:w-3/4 md:w-3/4 w-full flex  items-center h-20 rounded-b-3xl shadow-md border bg-white">
              <div className="flex items-center m-10 text-cyan-500">
                <div className="absolute left-0 flex items-center px-5">
                  <img src={logo} alt="logo" className="w-30 h-10 rounded object-cover" />
                </div>

                <div className='absolute right-0 flex flex-row-reverse px-5'>
                  <p className="text-lg font-medium font-roboto">
                    <Timer hoursMinSecs={getTimeLimit()} />
                  </p>
                  <RiTimerLine className="w-8 h-8 " />
                </div>
              </div>
            </div>
          </div>

          <QuestionForm exam={getShuffledQuestions()} />
          {unansweredCount > 0 ? <ConfirmationDialog count={unansweredCount} /> : ''}
        </>
      }
    </>
  )
}

export default ExamPanel
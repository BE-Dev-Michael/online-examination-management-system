import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { atom, useRecoilState, useRecoilValue } from 'recoil'

const EXAM_URI = `${process.env.REACT_APP_BASE_URL}/api/exams/`

const previewQuestionsState = atom({
  key: 'previewQuestionsState',
  default: false
})
function ExamQuestionChoices(props) {
    return(
    <>
        <div className='flex items-center gap-1'>
          <input type="radio" name="choice" /> 
          <label className='text-lg'>
            {props.choice}
            {props.answer === props.choice ? <span className='ml-4 py-1 px-2 bg-lime-300 text-sm rounded-full'>Correct Answer</span> : ''}
          </label>
        </div>
    </>
    )
}
function ExamQuestions(props) {
    const knowledgeDimensions = {
      'A': 'Factual',
      'B': 'Conceptual',
      'C': 'Procedural',
      'D': 'Metacognitive'
    }
    const cognitiveProcessDimensions = {
      '1': 'Remember',
      '2': 'Understand',
      '3': 'Apply',
      '4': 'Analyze',
      '5': 'Evaluate',
      '6': 'Create'
    }
    return(
        <>
        <div className='w-[80%] rounded-lg bg-white p-1 shadow-lg'>
          <header className='flex justify-between border-b border-b-slate-400 p-4'>
              <h1 className='font-bold'>Question {props.no}</h1>
              <h1 className='font-semibold'>{props.points === 1 ? `${props.points}pt` : `${props.points}pts`}</h1>
          </header>
          <div className='w-full pl-4 py-8'>
              <h1 className='font-semibold'>{props.question}</h1>
          </div>
          <div className='w-full px-7 pb-7'>
              {props.choices.map(choice => {
                  return <ExamQuestionChoices choice={choice} answer={props.answer}/>
              })}
          </div>
          <div className='w-full px-7 pb-7'>
            <div className='flex justify-end gap-4'>
              <h1 className='text-sm'>Knowledge Dimension: {knowledgeDimensions[props.kd]}</h1>
              <h1 className='text-sm'>Cognitive Process Dimension: {cognitiveProcessDimensions[props.cpd]}</h1>
            </div>
          </div>
        </div>
      </>
    )
}
function ExamDetails(props) {
    const [previewQuestions, setPreviewQuestions] = useRecoilState(previewQuestionsState)
    const [isPublished, setIsPublished] = useState(false)
    const mergedQuestions = props.questions.concat(props.groups)
    let points = mergedQuestions.map(data => data.points)
    //* Get the sum of all points in array
    let totalPoints = points.reduce((prev, curr) => prev + curr, 0)

    useEffect(() => {
        setIsPublished(props.isPublished)
        setPreviewQuestions(false)
    }, [])

    const publishExam = async () => {
        try {
          const publishedExam = await axios.patch(EXAM_URI.concat(`publish/${props.id}`), { isPublished: !isPublished })
          console.log(publishedExam);
          setIsPublished(!isPublished)
        } catch (error) {
          console.error(error);
        }
    }
    
    return(
      <div className='relative flex flex-col gap-10 py-5 px-0 items-center'>
        <div className={`bg-white w-[80%] rounded-lg shadow-lg p-5 h-auto ${previewQuestions === true ? 'hidden' : 'block'}`}>
          <h1 className='text-2xl font-bold mb-4'>{props.title}</h1>
          <h1 className='font-bold'>Exam Description</h1>
          <div
            className='mb-4'
            dangerouslySetInnerHTML={{__html: props.desc}}
          />
          <div className='flex flex-col mb-4'>
            <h1 className='font-bold'>Questions</h1>
            <p>{mergedQuestions.length}</p>
          </div>
          <div className='flex flex-col mb-4'>
            <h1 className='font-bold'>Points</h1>
            <p>
              {totalPoints}
            </p>
          </div>
          <div className='flex flex-col mb-4'>
            <h1 className='font-bold'>Time Limit</h1>
            <p>{props.timeLimit} minutes</p>
          </div>
          <div className='flex flex-col mb-4'>
            <h1 className='font-bold'>Available from</h1>
            <p>{props.startDate}</p>
          </div>
          <div className='flex flex-col mb-4'>
            <h1 className='font-bold'>Until</h1>
            <p>{props.endDate}</p>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h1 className='font-bold'>Exam Code</h1>
              <p>{props.examCode}</p>
            </div>
            <div className='flex gap-4'>
              <button onClick={() => setPreviewQuestions(!previewQuestions)} className='px-5 py-2 bg-[#7B9EBE] text-white rounded-lg'>Preview Questions</button>
              <button onClick={publishExam} className={`px-5 py-2 rounded-lg text-white ${isPublished === true ? 'bg-amber-300' : 'bg-[#7CBE83]'} `}>
                {isPublished === true ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
         {/* //* Merging questions directly from exam and from pulling questions from bank */}
         {previewQuestions === true ? props.questions.concat(props.groups).map((data, index) => {
             return <ExamQuestions question={data.question} no={index+1} choices={data.choices} points={data.points} answer={data.answer} kd={data.kd} cpd={data.cpd}/>
         }) : ''}
      </div>
    )
}
function ExamPreview() {
  const { id } = useParams()
  const [examData, setExamData] = useState()

  useEffect(() => {
    const fetchExamData = async () => {
        try {
            const fetchedData = await axios.get(EXAM_URI.concat(id))
            setExamData(fetchedData.data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchExamData()
  }, [])
  

  return (
    <div>
        {examData && 
          <ExamDetails 
              id={id}
              title={examData.title}
              desc={examData.desc}
              timeLimit={examData.timeLimit}
              startDate={examData.startDate}
              endDate={examData.endDate}
              examCode={examData.examCode}
              questions={examData.questions}
              groups={examData.groups}
              isPublished={examData.isPublished}
          />
        }
    </div>
  )
}

export default ExamPreview
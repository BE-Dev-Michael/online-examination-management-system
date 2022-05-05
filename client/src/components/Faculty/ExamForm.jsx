import React, {useState, useEffect} from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker';
import './QuestionBanks.css'
import { IoAddCircleOutline, IoClose } from 'react-icons/io5'

//* GET and POST method
//* POST for adding exam
//* GET for getting all exams
const EXAMS_URI = 'http://localhost:7771/api/exams'

const richTextState = atom({
    key: 'examRichTextState',
    default: ''
})
const examFormDataState = atom({
    key: 'examFormDataState',
    default: {
        title: null,
        desc: null,
        timeLimit: null,
        startDate: null,
        endDate: null,
        examCode: null,
        questions: [],
        groups: [],
        isPublished: false
    }
})
const examFormState = atom({
    key: 'examFormState',
    default: false
})

function ExamDescriptionRichText() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [, setRichText] = useRecoilState(richTextState)
    const [formData, setFormData] = useRecoilState(examFormDataState)
      
      
    useEffect(() => {
        setRichText(editorState.getCurrentContent().getPlainText())
        console.log(formData)
    }, [editorState])
      
    const textEditorHandler = (e) => {
      setEditorState(e)
      const value = editorState.getCurrentContent().getPlainText()
      setFormData({...formData, ['desc']: value})
    }
     
    function uploadImageCallback(file) {
      const image = URL.createObjectURL(file)
        console.log(image)
      return new Promise(
        (resolve, reject) => {
          resolve({ data: { link: image } });
        }
      );
    }
    return (
        <div className='overflow-hidden'>
          <Editor 
            editorClassName='exam-desc-editor'
            editorState={editorState}
            wrapperStyle={{ backgroundColor: "white", padding: "5px"}}
            editorStyle={{height: "500px"}}
            onEditorStateChange={textEditorHandler}
            toolbar={{
              image: { uploadEnabled: true, uploadCallback: uploadImageCallback, previewImage: true}
            }}
            />
        </div>
    )
}
function ExamQuestions() {
    return(
      <>
        <div className='flex flex-col gap-4 items-center'>
          <div className='flex flex-col items-center'>
            <h1 className='font-semibold'>Add a question directly to exam</h1>
            <a className='cursor-pointer text-[#7B9EBC] text-lg underline underline-offset-1'>+ Add a Question</a>
          </div>
          <div className='flex items-center font-semibold'>
            or
          </div>
          <div className='flex flex-col items-center'>
            <h1 className='font-semibold'>Add a question from question bank</h1>
            <a className='cursor-pointer text-[#7B9EBC] text-lg underline underline-offset-1'>+ Create Question Group</a>
          </div>
          
        </div>
        <div className='border-b mt-4'></div>
      </>
    )
}
function ExamDetails() {
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [formData, setFormData] = useRecoilState(examFormDataState)

 
    const formDataHandler = (e) => {
      const { name, value } = e.target
      setFormData({...formData, [name]: value})
      
      console.log(formData)
    }
    return(
      <>
        <h1 className='font-bold mb-2 ml-3 mt-3'>Exam Title</h1>
        <input className='p-2 border-b ml-3 focus:outline-[#7B9EBE] w-[70%] mx-auto' type="text" placeholder='Title'/>
        <div className='flex flex-col'>
          <h1 className='font-bold mb-2 ml-3 mt-3'>Exam Description</h1>
          <ExamDescriptionRichText/>
        </div>
        <div className='border-b'></div>
        <div className='w-full p-2 mb-5 mt-5'>
          <div className='flex flex-col gap-4 lg:justify-between lg:flex-row'>
            <div className='w-full lg:w-[33%]'>
              <h1 className='font-bold mb-2'>Time Limit</h1>
              <input className='p-2 border-b focus:outline-[#7B9EBE]' type="number" placeholder='Minutes'/>
            </div>
            <div className='w-full lg:w-[33%]'>
              <h1 className='font-bold mb-2'>Available from</h1>
              <DateTimePicker onChange={setStartDateTime} value={startDateTime} />
              <div className='mb-2'></div>
              <h1 className='font-bold mb-2'>Until</h1>
              <DateTimePicker onChange={setEndDateTime} value={endDateTime} />
            </div>
            <div className='w-full lg:w-[33%]'>
              <h1 className='font-bold mb-2'>Exam Code</h1>
              <input className='p-2 border-b focus:outline-[#7B9EBE] w-full' type="text"/>
            </div>
          </div>
        </div>
        <div className='border-b'></div>
      </>
    )
}
function ExamForm() {
  const [formData, setFormData] = useRecoilState(examFormDataState)
  const [isFormVisible, setIsFormVisible] = useRecoilState(examFormState)
  const [isNextClicked, setIsNextClicked] = useState(false)
 
  const submitExam = (e) => {
    e.preventDefault()
    const sendExamData = async () => {
      try {
        const newExam = await axios.post(EXAMS_URI, formData)
        console.log(newExam.data)
        window.location.reload(false);
      } catch (error) {
        console.error(error)
      }
    }
    sendExamData()
  }
  return(
    <div className='flex flex-col gap-4 mb-56'>
      <form onSubmit={submitExam}>
        <div className='flex items-center justify-center'>
          <div className='w-[80%] rounded-lg bg-white p-3 shadow-lg'>
            {isNextClicked !== true ? <ExamDetails/> : <ExamQuestions/>}
            
            <div className={`${isNextClicked !== true ? 'block' : 'hidden'} flex justify-end m-5 gap-4`}>
              <button onClick={() => setIsFormVisible(!isFormVisible)} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
              <button onClick={() => setIsNextClicked(!isNextClicked)} type='button' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Next</button>
            </div>
            <div className={`${isNextClicked !== true ? 'hidden' : 'block'} flex justify-between m-5`}>
              <div>
                <button onClick={() => setIsNextClicked(!isNextClicked)} type='button' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Previous</button>
              </div>
              <div className='flex gap-4'>
                <button onClick={() => setIsFormVisible(!isFormVisible)} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
                <button type='submit' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Save</button>
                <button type='submit' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Save & Publish</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ExamForm
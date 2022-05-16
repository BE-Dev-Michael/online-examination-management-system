import React, {useState, useEffect, useCallback} from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker';
import './QuestionBanks.css'
import { IoAddCircleOutline, IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import getUserData from '../Auth/authService';

//* GET and POST method
//* POST for adding exam
//* GET for getting all exams
const EXAMS_URI = `${process.env.REACT_APP_BASE_URL}/api/exams`
const EXAM_URI = `${process.env.REACT_APP_BASE_URL}/api/exams/`
const BANKS_URI = `${process.env.REACT_APP_BASE_URL}/api/banks`

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
const createGroupState = atom({
  key: 'createGroupState',
  default: false
})
const selectBankModalState = atom({
  key: 'selectBankModalState',
  default: false
})
const bankListState = atom({
  key: 'bankListState',
  default: []
})
const selectedBankState = atom({ 
  key: 'selectedBankState',
  default: null
})
const clickedBankState = atom({ 
  key: 'clickedBankState',
  default: null
})
const questionGroupState = atom({ 
  key: 'questionGroupState',
  default: []
})
const questionGroupDataState = atom({ 
  key: 'questionGroupDataState',
  default: {
    groupName: null,
    noOfQuestions: null,
    questionBank: null,
    questions: null
  }
})
const viewQuestionGroupState = atom({
  key: 'viewQuestionGroupState',
  default: {
    isVisible: false,
    index: null
  }
})

function InstructionsRichText() {
    const [, setRichText] = useRecoilState(richTextState)
    const [formData, setFormData] = useRecoilState(examFormDataState)
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
      
      
    useEffect(() => {
        setRichText(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }, [editorState])
      
    const textEditorHandler = (e) => {
      setEditorState(e)
      const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      setFormData({...formData, desc: value})
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
            editorStyle={{height: "500px", border: '1px solid gray'}}
            onEditorStateChange={textEditorHandler}
            toolbar={{
              image: { uploadEnabled: true, uploadCallback: uploadImageCallback, previewImage: true}
            }}
            />
        </div>
    )
}
function ModalBankList(props) {
  const initials = [...props.title].filter(initial => initial === initial.toUpperCase())
  const [clickedBank, setClickedBank] = useRecoilState(clickedBankState)

  const clickedBankHandler = () => {
      setClickedBank(props.id)
  }
   return(
      <ul className='w-full'>
        <li onClick={clickedBankHandler} className="flex flex-row">
          <div className={`select-none cursor-pointer flex flex-1 items-center p-4 shadow border rounded-lg ${clickedBank === props.id ? 'bg-slate-400 hover:bg-slate-400' : 'bg-white hover:bg-slate-100'}`}>
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4 rounded-full bg-gradient-to-r from-[#7CBE83] to-[#7B9EBC]">
              <div className='text-white text-3xl'>
                {initials.map(value => value).join('').split(' ').join('').substring(0, 2)}
              </div>
            </div>
            <div className="flex-1 pl-1 mr-16">
              <div className={`font-medium ${clickedBank === props.id ? 'text-white' : 'text-black'}`}>
                {props.title}
              </div>
              <div className={`${clickedBank === props.id ? 'text-white' : 'text-gray-600'} text-sm`}>
               {props.noOfQuestions === 1 ? `${props.noOfQuestions} Question` : `${props.noOfQuestions} Questions`}
              </div>
            </div>
          </div>
        </li>
      </ul>
   )
}
function ExamSelectBankModal() {
   const [isModalVisible, setIsModalVisible] = useRecoilState(selectBankModalState)
   const bankList = useRecoilValue(bankListState)
   const [selectedBank, setSelectedBank] = useRecoilState(selectedBankState)
   const [clickedBank, setClickedBank] = useRecoilState(clickedBankState)
   const [questionGroupData, setQuestionGroupData] = useRecoilState(questionGroupDataState)

   const resetModal = () => {
      setIsModalVisible(false)
      setClickedBank(null)
   }

   useEffect(() => {
     console.log(questionGroupData)
   }, [isModalVisible])
   

   const pullQuestionFromBank = async () => {
      try {
        const fetchedBanks = await axios.post(EXAMS_URI.concat(`/pull/${clickedBank}`), 
        {limit: parseInt(questionGroupData.noOfQuestions)})
        console.log(fetchedBanks.data);
        setQuestionGroupData({...questionGroupData, questionBank: fetchedBanks.data.title,
        questions: fetchedBanks.data.questions})
        setSelectedBank(clickedBank)
        setIsModalVisible(false)
      } catch (error) {
        console.error(error);
      }
  }
   
   return(
     <>
      <div className="fixed inset-0 z-50">
        <div className='absolute inset-0 bg-black opacity-50 h-screen w-screen'/>
        <div className="relative px-4 h-screen flex items-center justify-center">
          <div className="relative w-[50%] bg-white rounded-lg p-4 mx-4">
            <div className="relative flex flex-col mx-auto w-full h-[70vh] max-h-[70vh] items-center justify-center bg-white rounded-lg overflow-auto">
              <div className='h-full w-full'>
                {bankList.map(bank => {
                  return <ModalBankList key={bank.id} id={bank.id} title={bank.title} noOfQuestions={bank.questions.length}/>
                })}
              </div>
            </div>
            <div className='border my-5'/>
            <div className='flex justify-end gap-4'>
              <button onClick={resetModal} className='px-5 py-2 bg-slate-300 rounded-lg shadow-lg'>Cancel</button>
              <button onClick={pullQuestionFromBank} className='px-5 py-2 bg-[#7B9EBC] text-white rounded-lg shadow-lg'>Select Bank</button>
            </div>
          </div>
        </div>
      </div>
    </>
   )
}
function ExamQuestionGroup() {
   const [isModalVisible, setIsModalVisible] = useRecoilState(selectBankModalState)
   const [bankList, setBankList] = useRecoilState(bankListState)
   const [selectedBank, setSelectedBank] = useRecoilState(selectedBankState)
   const [clickedBank, setClickedBank] = useRecoilState(clickedBankState)
   const [isCreateGroup, setIsCreateGroup]= useRecoilState(createGroupState)
   const [questionGroupData, setQuestionGroupData] = useRecoilState(questionGroupDataState)
   const [questionGroup, setQuestionGroup] = useRecoilState(questionGroupState)
   const [formData, setFormData] = useRecoilState(examFormDataState)
   const [hasQuestionNo, setHasQuestionNo] = useState(false)

   const getBankList = async () => {
      setIsModalVisible(!isModalVisible)
      setClickedBank(null)
      try {
        const { _id } = await getUserData()
        const banks = await axios.get(BANKS_URI.concat(`/all/${_id}`))
            
        let fetchedBanks = banks.data.map(data => {
            return { id: data._id, title: data.title, questions: data.questions }
        })
            
        setBankList(fetchedBanks)
      } catch (error) {
          throw new Error(error)
      }
      
   }

  const cancelCreateGroup = () => {
    setSelectedBank(null)
    setIsCreateGroup(!isCreateGroup)
  }

  useEffect(() => {
      console.log(questionGroup);
  }, [questionGroup])
  

  const questionGroupDataHandler = (e) => {
    const {name, value} = e.target
    if (name === 'noOfQuestions') {
      parseInt(value) > 0 ? setHasQuestionNo(true) : setHasQuestionNo(false)
    }
    setQuestionGroupData({...questionGroupData, [name]: value})
  }

  const createQuestionGroup = () => {
    setQuestionGroup([...questionGroup, questionGroupData])
    let formQuestionIds = questionGroupData.questions.map(question => question._id)
    let groupsCopy = [...formData.groups]
    groupsCopy.push(...formQuestionIds)
    setFormData({...formData, groups: groupsCopy})
    setSelectedBank(null)
    setIsCreateGroup(!isCreateGroup)
  }

   return(
    <div className='mb-5 mt-5 rounded-lg shadow border p-5'>
      <div className='flex gap-4'>
        <input name='groupName' onChange={questionGroupDataHandler} value={questionGroupData.groupName} type="text" placeholder='Group Name'/>
        <input name='noOfQuestions' onChange={questionGroupDataHandler} value={questionGroupData.noOfQuestions} type="number" placeholder='Number of Questions'/>
      </div>
      <div className='mt-3'>
        <a onClick={getBankList} className={`${hasQuestionNo === true ? 'block' : 'hidden'} cursor-pointer text-[#7B9EBC] underline underline-offset-1`}>Select from Question Bank</a>
      </div>
      <div className='mt-2 flex flex-col gap-4'>
        {selectedBank !== null ? 
        <span>Questions will be randomly pulled from:  
          <a className='cursor-pointer text-[#7B9EBC] underline underline-offset-1'>
            {questionGroupData.questionBank}
          </a>
        </span>
        : ''}
        
      </div>
      <div className={`flex gap-4 mt-2`}>
        <button onClick={cancelCreateGroup} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
        <button onClick={createQuestionGroup} type='button' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Create Group</button>
      </div>
    </div>
   )
}
function AddQuestionChoices() {
  const [isCreateGroup, setIsCreateGroup] = useRecoilState(createGroupState)
  return(
    <>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold'>Add a question directly to exam</h1>
        <a className='cursor-pointer text-[#7B9EBC] text-lg underline underline-offset-1'>+ Add a Question</a>
      </div>
      <div className='flex items-center font-semibold'>
        or
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold'>Add a question from question bank</h1>
        <a onClick={() => setIsCreateGroup(!isCreateGroup)} className='cursor-pointer text-[#7B9EBC] text-lg underline underline-offset-1'>+ Create Question Group</a>
      </div>
    </>
  )
}
function QuestionList(props) {
  return(
    <div className='shadow border w-full'>
      <header className='flex justify-between border-b p-3'>
        <h1 className='font-bold'>{props.question}</h1>
        <h1 className='font-bold'>{props.points === 1 ? `${props.points} Point` : `${props.points} Points`}</h1>
      </header>
      <div className='flex flex-col gap-1 p-3'>
        {props.choices.map(choice => {
          return <div className='flex gap-2'>
                  <input className='my-auto' type="radio" name="choice" /> 
                  <label className='text-md'>
                    {choice}
                  </label>
                </div> 
        })}
      </div>
    </div>
  )
}
function ViewQuestionGroup() {
    const [viewQuestionGroup, setViewQuestionGroup] = useRecoilState(viewQuestionGroupState)
    const questionGroup = useRecoilValue(questionGroupState)
 
    return(
      <>
        <div className="fixed inset-0 z-50">
          <div className='absolute inset-0 bg-black opacity-50 h-screen w-screen'/>
          <div className="relative px-4 h-screen flex items-center justify-center">
            <div className="relative w-[50%] bg-white rounded-lg p-4 mx-4">
              <div className="relative flex flex-col mx-auto w-full h-[70vh] max-h-[70vh] items-center justify-center bg-white rounded-lg overflow-auto">
                <div className='h-full w-full'>
                  {questionGroup[viewQuestionGroup.index]
                  .questions.map(question => {
                      return <QuestionList 
                              key={question._id} 
                              question={question.question} 
                              choices={question.choices} 
                              answer={question.answer}
                              points={question.points}/>
                   
                  })}
                </div>
              </div>
              <div className='border my-5'/>
              <div className='flex justify-end gap-4'>
                <button onClick={() => setViewQuestionGroup({...viewQuestionGroup, ['isVisible']: false})} className='px-5 py-2 bg-slate-300 rounded-lg shadow-lg'>Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
function QuestionGroupCard(props) {
    const [viewQuestionGroup, setViewQuestionGroup] = useRecoilState(viewQuestionGroupState)
    return(
      <div className='shadow border w-[80%]'>
        <header className='flex justify-between border-b p-3'>
          <h1 className='font-bold'>{props.groupName}</h1>
          <h1 className='font-bold'>{props.noOfQuestions === '1' ? `${props.noOfQuestions} Question` : `${props.noOfQuestions} Questions`}</h1>
        </header>
        <div className='w-full p-3 flex justify-between'>
         <span>Questions will be randomly pulled from: {props.questionBank}</span>
         <span><a onClick={() => setViewQuestionGroup({...viewQuestionGroup, isVisible: true, index: props.index})} className='cursor-pointer text-[#7B9EBC] text-lg underline underline-offset-1'>View</a></span>
        </div>
      </div>
    )
}
function ExamQuestions() {
    const isCreateGroup = useRecoilValue(createGroupState)
    const questionGroup = useRecoilValue(questionGroupState)
    return(
      <>
        <div className='flex flex-col gap-4 items-center'>
          {questionGroup && questionGroup.map((group, index) => {
            return  <QuestionGroupCard 
                      key={index}
                      index={index}
                      groupName={group.groupName} 
                      noOfQuestions={group.noOfQuestions}
                      questionBank={group.questionBank}/>
          })}
    
          {isCreateGroup ? <ExamQuestionGroup/> : <AddQuestionChoices/>}
        </div>
        <div className='border-b mt-4'></div>
      </>
    )
}
function ExamDetails() {
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [formData, setFormData] = useRecoilState(examFormDataState)
    const dateFormat = {month: 'short', day: 'numeric', weekday: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}

    useEffect(() => {
      let value = new Date(startDateTime).toLocaleString('en-US', dateFormat)
      setFormData({...formData, startDate: value})
    }, [startDateTime])

    useEffect(() => {
      let value = new Date(endDateTime).toLocaleString('en-US', dateFormat)
      setFormData({...formData, endDate: value})
    }, [endDateTime])
    
    const formDataHandler = (e) => {
      const { name, value } = e.target
      console.log(formData);
      setFormData({...formData, [name]: value})
    }
    return(
      <>
        <h1 className='font-bold mb-2 ml-3 mt-3'>Exam Title</h1>
        <input onChange={formDataHandler} value={formData.title} name='title' className='p-2 border-b ml-3 focus:outline-[#7B9EBE] w-[70%] mx-auto' type="text" placeholder='Title'/>
        <div className='flex flex-col'>
          <h1 className='font-bold mb-2 ml-3 mt-3'>Instructions</h1>
          <InstructionsRichText/>
        </div>
        <div className='border-b'></div>
        <div className='w-full p-2 mb-5 mt-5'>
          <div className='flex flex-col gap-4 lg:justify-between lg:flex-row'>
            <div className='w-full lg:w-[33%]'>
              <h1 className='font-bold mb-2'>Time Limit</h1>
              <input onChange={formDataHandler} value={formData.timeLimit} name='timeLimit' className='p-2 border-b focus:outline-[#7B9EBE]' type="number" placeholder='Minutes'/>
            </div>
            <div className='w-full lg:w-[33%]'>
              <h1 className='font-bold mb-2'>Available from</h1>
              <DateTimePicker onChange={setStartDateTime} value={startDateTime} name='startDate' />
              <div className='mb-2'></div>
              <h1 className='font-bold mb-2'>Until</h1>
              <DateTimePicker onChange={setEndDateTime} value={endDateTime} name='endDate' />
            </div>
            <div className='w-full lg:w-[33%]'>
              <h1 className='font-bold mb-2'>Exam Code</h1>
              <input onChange={formDataHandler} value={formData.examCode} name='examCode' className='p-2 border-b focus:outline-[#7B9EBE] w-full' type="text"/>
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
  const [, setSelectedBank] = useRecoilState(selectedBankState)
  const isModalVisible = useRecoilValue(selectBankModalState)
  const [isCreateGroup, setIsCreateGroup] = useRecoilState(createGroupState)
  const [viewQuestionGroup, setViewQuestionGroup] = useRecoilState(viewQuestionGroupState)
  const [publish, setPublish] = useState(false)
  const navigate = useNavigate()
  const resetExamForm = useResetRecoilState(examFormDataState)
  const resetQuestionGroup = useResetRecoilState(questionGroupState)
  const resetQuestionGroupData = useResetRecoilState(questionGroupDataState)
  
  useEffect(() => {
    setSelectedBank(null)
    setIsCreateGroup(false)
  }, [])
  
 
  const submitExam = (e) => {
    e.preventDefault()
    console.log(formData);
  
    const sendExamData = async () => {
      try {
        const { _id } = await getUserData()
        const examData = {...formData, user: _id}
        const newExam = await axios.post(EXAMS_URI, examData)  
        if (publish === true) {
          await axios.patch(EXAM_URI.concat(`publish/${newExam.data._id}`), { isPublished: true })
          setPublish(false)
        }
        resetExamForm()
        resetQuestionGroup()
        resetQuestionGroupData()
        navigate('/faculty/exams')
      } catch (error) {
        console.error(error)
      }
    }
    sendExamData()
  }

  return(
    <>
      <div className='flex flex-col gap-4 mb-56'>
        <form onSubmit={submitExam}>
          <div className='flex items-center justify-center'>
            <div className='w-[80%] rounded-lg bg-white p-3 shadow-lg'>
              {/* {isNextClicked !== true ? <ExamDetails/> : <ExamQuestions/>} */}
              <div className={isNextClicked !== true ? 'block' : 'hidden'}>
                <ExamDetails/>
              </div>
              <div className={isNextClicked !== true ? 'hidden' : 'block'}>
                <ExamQuestions/>
              </div>
              <div className={`${isNextClicked !== true ? 'block' : 'hidden'} flex justify-end m-5 gap-4`}>
                <button onClick={() => setIsFormVisible(!isFormVisible)} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
                <button onClick={() => setIsNextClicked(!isNextClicked)} type='button' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Next</button>
              </div>
              <div className={`${isNextClicked !== true ? 'hidden' : 'block'} flex justify-between m-5`}>
                <div>
                  <button onClick={() => setIsNextClicked(!isNextClicked)} type='button' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Previous</button>
                </div>
                <div className={`flex gap-4`}>
                  <button onClick={() => setIsFormVisible(!isFormVisible)} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
                  <button type='submit' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Save</button>
                  <button onClick={() => setPublish(!publish)} type='submit' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Save & Publish</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isModalVisible ? <ExamSelectBankModal/> : ''}
      {viewQuestionGroup.isVisible ? <ViewQuestionGroup/> : ''}
    </>
  )
}

export default ExamForm
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToMarkdown from 'draftjs-to-markdown';
import { IoAddCircleOutline, IoClose } from 'react-icons/io5'
import './QuestionBanks.css'
import axios from 'axios'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { useNavigate } from 'react-router-dom'

const BANK_URI = 'http://localhost:7771/api/banks/'

const questionFormState = atom({
   key: 'questionFormState',
   default: false
})
const richTextState = atom({
    key: 'richTextState',
    default: ''
})
const formDataState = atom({
    key: 'formDataState',
    default: {question: null,
              choices: [],
              answer: null,
              points: 0}
})
const bankIdState = atom({
  key: 'bankIdState', 
  default: null
})
const numOfChoicesState = atom({
    key: 'numOfChoicesState',
    default: 4
})


function RichTextEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [, setRichText] = useRecoilState(richTextState)
    const [question, setQuestion] = useRecoilState(formDataState)
    
    
    useEffect(() => {
        setRichText(editorState.getCurrentContent().getPlainText())
        console.log(question)
    }, [editorState])
    
    const textEditorHandler = (e) => {
      setEditorState(e)
      const key = Object.keys(question)
      const value = editorState.getCurrentContent().getPlainText()
      setQuestion({...question, [key[0]]: value})
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
            editorClassName='question-editor'
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
function InputChoice(props) {
    const [numOfChoices, setNumOfChoices] = useRecoilState(numOfChoicesState)
    const [formData, setFormData] = useRecoilState(formDataState)

    useEffect(() => {
        console.log(formData.choices);
    }, [formData.choices])
    
   
    const deleteChoiceHandler = () => {
        if (numOfChoices === 2) {
            alert('There should be at least two choices!')
            return
        }
        const choicesCopy = [...formData.choices]
        const newChoices = choicesCopy.filter((choice, index) => props.index !== index)
        setFormData({...formData, ['choices']: newChoices})
        setNumOfChoices(prev => prev - 1)
    }
    const choiceIndexHandler = (e) => {
        const { name, value } = e.target
        const choicesCopy = [...formData.choices]
        choicesCopy[props.index] = value
        setFormData({...formData, [name]: choicesCopy})
    }
    return(
        <div className='flex gap-4'>
            <input onChange={choiceIndexHandler} className='p-2 border-b focus:outline-[#7B9EBE] w-[95%]' placeholder="Choice" type="text" name='choices' value={formData.choices[props.index]} required/>
            <button onClick={deleteChoiceHandler} type='button'>{<IoClose/>}</button>
        </div>
    )
}
function QuestionForm() {
    const richTextValue = useRecoilValue(richTextState)
    const [formData, setFormData] = useRecoilState(formDataState)
    const bankId = useRecoilValue(bankIdState)
    const navigate = useNavigate()
    const [isFormVisible, setIsFormVisible] = useRecoilState(questionFormState)
    const [numOfChoices, setNumOfChoices] = useRecoilState(numOfChoicesState)

    useEffect(() => {
        if (isFormVisible === true) {
            document.getElementById('pointsField').focus()
        }
    }, [isFormVisible])
    
    const formDataHandler = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
        
        console.log(formData)
    }
    const submitQuestion = (e) => {
        e.preventDefault()
        const sendQuestionData = async () => {
          try {
            const newQuestion = await axios.post(BANK_URI.concat(`question/${bankId}`), formData)
            console.log(newQuestion.data)
            window.location.reload(false);
          } catch (error) {
            console.error(error)
          }
        }
        sendQuestionData()
    }
    return (
      <form onSubmit={submitQuestion}>
        <div className='w-full rounded-lg bg-white p-1 shadow-lg'>
          <header className='flex justify-between items-center border-b border-b-slate-400 p-4'>
            <input className='font-bold p-2 bg-transparent w-full break-all max-w-lg' name="question" value={richTextValue}/>
            <input id="pointsField" name="points" onChange={formDataHandler} className="p-2 border-b focus:outline-[#7B9EBE] max-w-[100px] text-right" type="number" placeholder='Points' required/>
          </header>
          <div>
             <h1 className='font-bold mb-2 ml-3 mt-3'>Question</h1>
            <RichTextEditor/>
          </div>
          <div className='w-full p-2 mb-5'>
            <div className='flex justify-between px-1'>
                <h1 className='font-bold mb-5'>Choices</h1>
                <a onClick={() => setNumOfChoices(prev => prev + 1)} className='text-[#7B9EBE] cursor-pointer'>+ Add Another Choice</a>
            </div>
            <div className='flex flex-col gap-4'>
              {[...Array(numOfChoices)].map((value, index) => {
                  return <InputChoice key={index} index={index}/> 
              }) }
            </div>
          </div>
          <div className='w-full p-2 mb-5'>
            <h1 className='font-bold mb-5'>Correct Answer</h1>
            <select className='p-2 w-full border' name="answer" id="" onChange={formDataHandler}>
              <option value='' selected disabled>Select the correct answer...</option>
              {formData.choices !== 'undefined' ? formData.choices.map(choice => {
                  return <option value={choice}>{choice}</option>
              }) : ''}
            </select>
          </div>
          <div className='flex justify-start gap-4 m-5'>
            <button type='submit' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Save question</button>
            <button onClick={() => setIsFormVisible(!isFormVisible)} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
          </div>
        </div>
      </form>
    )
}
function QuestionChoices(props) {
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
function QuestionCard(props) {
    
    return(
      <>
        <div className='w-full rounded-lg bg-white p-1 shadow-lg'>
          <header className='flex justify-between border-b border-b-slate-400 p-4'>
            <h1 className='font-bold'>Question</h1>
            <h1 className='font-semibold'>{props.points === 1 ? `${props.points}pt` : `${props.points}pts`}</h1>
          </header>
          <div className='w-full pl-4 py-8'>
            <h1 className='font-semibold'>{props.question}</h1>
          </div>
          <div className='w-full px-7 pb-7'>
            {props.choices.map(choice => {
                return <QuestionChoices choice={choice} answer={props.answer}/>
            })}
          </div>
        </div>
      </>
    )
}
function QuestionsMain(props) {
  const [isFormVisible, setIsFormVisible] = useRecoilState(questionFormState)
  
   return (
      <div className='relative flex flex-col gap-10 lg:flex-row lg:gap-0 p-5'>
      <div className='w-full lg:w-[80%] px-5 flex flex-col'>
        <h1 className='text-white text-2xl font-bold mb-5'>{ props.bankData.title }</h1>
        <div className='min-h-[80px] px-3 py-5 border-b-slate-300 border-b mb-10'>
          {props.bankData.questions.length === 0 && isFormVisible === false ? 
          <h1 className='text-center text-white text-2xl'>You haven't added questions yet.</h1>
          :
          <div className='flex flex-col gap-4'>
            {props.bankData.questions.map(data => {
              return <QuestionCard 
                      key={data._id}
                      question={data.question} 
                      choices={data.choices}
                      points={data.points}
                      answer={data.answer}
                      />
            })}
            {isFormVisible ? <QuestionForm/> : ''}
          </div>}
        </div>
      </div>
      <div className='relative w-full h-auto lg:w-[20%] min-w-[263px]'>
        <div className='w-full lg:w-[260px] div-add-question mx-auto'> 
          <button onClick={() => setIsFormVisible(!isFormVisible)} className='btn-add-question relative flex mx-auto justify-center items-center shadow-lg rounded-2xl px-7 py-4 font-semibold min-w-[260px]'>
            <IoAddCircleOutline className='absolute left-6 text-white text-4xl'/>
            <span className='ml-20 mr-3'>Add a question</span>
          </button>
        </div>
      </div>
    </div>
   )
}
function Questions() {
    const { id }  = useParams()
    const [bankData, setBankData] = useState()
    const setBankId = useSetRecoilState(bankIdState)

    useEffect(() => {
        setBankId(id)
        const fetchBankData = async () => {
            try {
                const bankData = await axios.get(BANK_URI.concat(id))
                setBankData(bankData.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBankData()
    }, [])

   
    return (
      <div>
        {bankData && <QuestionsMain bankData={bankData}/>}
      </div>
    )
}

export default Questions
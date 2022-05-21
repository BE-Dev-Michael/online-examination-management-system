import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil'
import { IoClose } from 'react-icons/io5'

const QUESTION_URL = `${process.env.REACT_APP_BASE_URL}/api/banks/question`

const updateQuestionDataState = atom({
  key: 'updateQuestionDataState',
  default: null
})

const updateNumOfChoicesState = atom({
  key: 'updateNumOfChoicesState',
  default: 0
})

function RichTextEditor(props) {
  const [render, setRender] = useState(0)
  const [questionData, setQuestionData] = useRecoilState(updateQuestionDataState)
  const [editorState, setEditorState] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(`<p>${props.value}</p>`)
    )
  ));  

  const textEditorHandler = (e) => {
    setEditorState(e)
    const value = editorState.getCurrentContent().getPlainText()
    setQuestionData({...questionData, question: value})
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
          editorClassName='questionData-editor'
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
  const [numOfChoices, setNumOfChoices] = useRecoilState(updateNumOfChoicesState)
  const [questionData, setQuestionData] = useRecoilState(updateQuestionDataState)
 
  const deleteChoiceHandler = () => {
      if (numOfChoices === 2) {
          alert('There should be at least two choices!')
          return
      }
      const choicesCopy = [...questionData.choices]
      const newChoices = choicesCopy.filter((choice, index) => props.index !== index)
      setQuestionData({...questionData, choices: newChoices})
      setNumOfChoices(prev => prev - 1)
  }
  const choiceIndexHandler = (e) => {
      const { name, value } = e.target
      const choicesCopy = [...questionData.choices]
      choicesCopy[props.index] = value
      setQuestionData({...questionData, [name]: choicesCopy})
  }
  return(
      <div className='flex gap-4'>
        <input onChange={choiceIndexHandler} className='p-2 border-b focus:outline-[#7B9EBE] w-[95%]' placeholder="Choice" type="text" name='choices' value={questionData.choices?.[props.index]} required/>
        <button onClick={deleteChoiceHandler} type='button'>{<IoClose/>}</button>
      </div>
  )
}

function UpdateQuestionForm() {
  const location = useLocation()
  const id = location.state.id
  const navigate = useNavigate()
  const [questionData, setQuestionData] = useRecoilState(updateQuestionDataState)
  const [numOfChoices, setNumOfChoices] = useRecoilState(updateNumOfChoicesState)
  const resetQuestionData = useResetRecoilState(updateQuestionDataState)
  const resetNumOfChoices = useResetRecoilState(updateNumOfChoicesState)

  useEffect(() => {
     const getQuestionData = async () => {
        const questionData = await axios.get(QUESTION_URL.concat(`/${id}`))
        console.log(questionData.data);
        setQuestionData(questionData.data)
        setNumOfChoices(questionData.data.choices.length)
     }
     getQuestionData()
  }, [])

  const questionDataHandler = (e) => {
    const { name, value } = e.target
    setQuestionData({...questionData, [name]: value})
  }

  const updateQuestion = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(QUESTION_URL.concat(`/${id}`), { questionData: questionData })
      navigate(-1)
    } catch (error) {
      console.error(error);
    }
  }

  const cancelUpdate = () => {
    resetQuestionData()
    resetNumOfChoices()
    navigate(-1)
  }
  

  return (
    <div className='relative flex flex-col gap-10 py-5 px-0'>
      <div className='w-full px-0 md:px-5 flex flex-col'>
        <div className='min-h-[80px] px-3 py-5 border-b-slate-300 border-b mb-10'>
          <div className='flex flex-col gap-4'>
            <form onSubmit={updateQuestion}>
              <div className='w-full rounded-lg bg-white p-1 shadow-lg'>
                <header className='flex justify-between items-center border-b border-b-slate-400 p-4'>
                  <input className='font-bold p-2 bg-transparent w-full break-all max-w-lg' name="questionData"/>
                  <input id="pointsField" name="points" onChange={questionDataHandler} value={questionData?.points} className="p-2 border-b focus:outline-[#7B9EBE] max-w-[100px] text-right" type="number" placeholder='Points' required/>
                </header>
                <div>
                  <h1 className='font-bold mb-2 ml-3 mt-3'>Question</h1>
                  {questionData && <RichTextEditor value={questionData.question}/>}
                </div>
                <div className='w-full p-2 mb-5'>
                  <div className='flex justify-between px-1'>
                      <h1 className='font-bold mb-5'>Choices</h1>
                      <a onClick={() => setNumOfChoices(prev => prev + 1)} className='text-[#7B9EBE] cursor-pointer'>+ Add Another Choice</a>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {[...Array(numOfChoices)]?.map((value, index) => {
                        return <InputChoice key={index} index={index}/> 
                    }) }
                  </div>
                </div>
                <div className='w-full p-2 mb-5'>
                  <h1 className='font-bold mb-5'>Correct Answer</h1>
                  <select className='p-2 w-full border' name="answer" value={questionData?.answer} onChange={questionDataHandler}>
                    {questionData?.choices?.map(choice => {
                        return <option value={choice}>{choice}</option>
                    })}
                  </select>
                </div>
                <div className='w-full p-2 mb-5'>
                  <h1 className='font-bold mb-5'>Knowledge Dimension</h1>
                  <select className='p-2 w-full border' name="kd" value={questionData?.kd} onChange={questionDataHandler}>
                    <option value='A'>Factual</option>
                    <option value='B'>Conceptual</option>
                    <option value='C'>Procedural</option>
                    <option value='D'>Metacognitive</option>
                  </select>
                </div>
                <div className='w-full p-2 mb-5'>
                  <h1 className='font-bold mb-5'>Cognitive Process Dimension</h1>
                  <select className='p-2 w-full border' name="cpd" value={questionData?.cpd} onChange={questionDataHandler}>
                    <option value='1'>Remember</option>
                    <option value='2'>Understand</option>
                    <option value='3'>Apply</option>
                    <option value='4'>Analyze</option>
                    <option value='5'>Evaluate</option>
                    <option value='6'>Create</option>
                  </select>
                </div>
                <div className='flex justify-start gap-4 m-5'>
                  <button type='submit' className='px-5 py-2 bg-[#7B9EBE] text-white rounded-md shadow-md'>Update question</button>
                  <button onClick={cancelUpdate} type='button' className='px-5 py-2 bg-slate-300 rounded-md shadow-md'>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateQuestionForm
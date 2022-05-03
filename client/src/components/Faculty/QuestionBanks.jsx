import React,{ useEffect, useRef } from 'react'
import axios from 'axios'
import './QuestionBanks.css'
import { IoAddCircleOutline, IoSearchOutline, IoClose, IoEllipsisHorizontal } from 'react-icons/io5'
import { IoMdArchive } from 'react-icons/io'
import { FiEdit3 } from 'react-icons/fi'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

//* GET and POST method
//* POST for adding question bank
//* GET for getting all question banks
const BANKS_URI = 'http://localhost:7771/api/banks'

//* GET, PATCH, and POST
//* GET for getting questions inside a bank
//* PATCH for updating bank title
//* POST for adding questions in a bank
const BANK_URI = 'http://localhost:7771/api/banks/'

const banksState = atom({
  key: 'banksState',
  default: []
})
const addTitleState = atom({
  key: 'addTitleState',
  default: ''
})
const editTitleState = atom({
  key: 'postTitleState',
  default: ''
})
const createModeState = atom({
  key: 'createModeState',
  default: false
})
const editModeState = atom({
  key: 'editModeState',
  default: false
})
const ellipsisMenuState = atom({
  key: 'ellipsisMenuState',
  default: false
})
const selectedBankState = atom({
  key: 'selectedBankState',
  default: ''
})




function ActionMenu(props) {
  const [isEditMode, setIsEditMode] = useRecoilState(editModeState)
  const [isEllipsisClicked, setIsEllipsisClicked] = useRecoilState(ellipsisMenuState)
  const selectedBankId = useRecoilValue(selectedBankState)
  
  const editBankTitle = () => {
    setIsEditMode(!isEditMode)
    setIsEllipsisClicked(!isEllipsisClicked)
    console.log(selectedBankId)
  }
  
  return (
    <div className="absolute right-0 z-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a ref={props.editTitle} onClick={editBankTitle} className="edit-title flex items-center block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
            <span className="flex justify-center items-center">
               <FiEdit3 className='mr-4'/>
                <span>
                    Edit bank title
                </span>
            </span>
        </a>
        <a href="#" className="flex items-center block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
            <span className="flex justify-center items-center">
                <IoMdArchive className='mr-4'/>
                <span>
                    Move to archive
                </span>
            </span>
        </a>
      </div>
    </div>
  )
}
function Bank(props) {
  const initials = [...props.title].filter(initial => initial === initial.toUpperCase())
  const [isEllipsisClicked, setIsEllipsisClicked] = useRecoilState(ellipsisMenuState)
  const [selectedBankId, setSelectedBankId] = useRecoilState(selectedBankState)
  const isEditMode = useRecoilValue(editModeState)
  const btnThreeDots = useRef(null)
  const editTitle = useRef(null)
  

  const outsideClick = (e) => {
    if (btnThreeDots.current.contains(e.target) || editTitle.current.contains(e.target)) {
      return
    }
    
    setIsEllipsisClicked(false)
  }

  useEffect(() => {
      if (isEllipsisClicked) {
        document.addEventListener('mousedown', outsideClick)
      }
      
      return () => {
        document.removeEventListener('mousedown', outsideClick);
      }
  }, [isEllipsisClicked])
  

  const ellipsisHandler = (_id) => {
    setIsEllipsisClicked(!isEllipsisClicked)
    setSelectedBankId(_id)
  }
  
  return (
      <div className="flex flex-col items-center justify-between shadow-lg rounded-[1.2rem] w-[350px] md:w-full lg:w-full p-4 bg-white relative min-h-[240px] max-h-[240px]">
        <div className='flex justify-between items-center w-full'>
          <span className='text-gray-600 bg-[#C8CFCF] rounded-xl py-1 px-5 text-xs'>
            {props.noOfQuestions === 1 ? `${props.noOfQuestions} Question` : `${props.noOfQuestions} Questions`} 
          </span>
          <div className='relative'>
            <button ref={btnThreeDots} onClick={() => ellipsisHandler(props._id)}>
              <IoEllipsisHorizontal className='text-lg cursor-pointer'/>
            </button>
            {isEllipsisClicked && isEditMode === false && selectedBankId ===  props._id ? <ActionMenu _id={props._id} editTitle={editTitle}/> : ''}
          </div>
        </div>
        <div className="w-full flex items-center justify-between mb-2 mt-2">
          {isEditMode && selectedBankId === props._id ? <EditBankMode /> : <h1 className='font-bold'>{props.title}</h1>}
          
        </div>
        
        <div className='flex justify-center items-center rounded-[1.2rem] bg-gradient-to-r from-[#7CBE83] to-[#7B9EBC] w-20 h-20'>
          <div className='text-white text-3xl'>
            {initials.map(value => value).join('').split(' ').join('').substring(0, 2)}
          </div>
        </div>

        <button onClick={props.open} className='bg-[#7B9EBE] hover:bg-[#6e8eac] rounded-xl text-white py-2 px-5 w-full mt-5 transition-all ease-linear delay-[.4ms]'>
          Open
        </button>
      </div>
  )
  
}
function EditBankMode() {
  const [editTitle, setEditTitle] = useRecoilState(editTitleState)
  const [, setIsEditMode] = useRecoilState(editModeState)
  const selectedBankId = useRecoilValue(selectedBankState)
  const [banks, setBanks] = useRecoilState(banksState)

  const submitEditedBank = async (e) => {
    e.preventDefault()
    try {
        const newTitle = await axios.patch(BANK_URI.concat(selectedBankId), { title: editTitle })
        console.log(newTitle.data._id);

        //* Naguupdate ng key-value pairs in an object inside an array
        const updatedBank = banks.map(bank => {
          if (bank.id === newTitle.data._id) {
              return {...bank, title: newTitle.data.title}
          }
          return bank
        })
        
        setBanks(updatedBank)
    } catch (error) {
      console.log(error)
    }
    setIsEditMode(false)
    setEditTitle('')
  }
  const keypressHandler = (e) => {
      if (e.key === 'Enter') {
        console.log('You pressed enter!')
      } else {
        console.log('Did not press enter')
      }
  }

 
  const cancelEditBank = () => {
     setIsEditMode(false)
     setEditTitle('')
  }
  return (
    <form onSubmit={submitEditedBank}>
      <div className='flex'>
        <input type="text" id="title" value={editTitle} onKeyDown={(e) => keypressHandler(e)} onChange={(e) => setEditTitle(e.target.value)} className="border-b mr-4 py-1 flex appearance-none px-1 bg-white text-gray-700 placeholder-gray-400 text-sm focus: border-0 focus: outline-0" name="title" placeholder="New Title" required/>
        <button type="button" onClick={cancelEditBank} className='flex justify-center bg-transparent items-center rounded-2xl font-semibold'>
          <IoClose className='text-black text-md m-0'/>
        </button>
      </div>    
   </form>
  )
}
function CreateBankButton() {
  const [, setIsCreateMode] = useRecoilState(createModeState)

  const createNewBank = () => {
    console.log('create')
      setIsCreateMode(true)
  }
  return (
    <>
      <div className='max-w-[700px]'>
        <button onClick={createNewBank} className='relative flex justify-center items-center btn-create shadow-lg rounded-2xl px-7 py-4 font-semibold'>
          <IoAddCircleOutline className='absolute left-6 text-white text-4xl'/>
          <span className='ml-20 mr-3'>Create New Bank</span>
        </button>
      </div>
    </>
  )
}
function CreateBankMode() {
    const [, setIsCreateMode] = useRecoilState(createModeState)
    const [, setBanks] = useRecoilState(banksState)
    const [addTitle, setAddTitle] = useRecoilState(addTitleState)

    const submitBank = async (e) => {
      e.preventDefault()
      try {
        const bank = await axios.post(BANKS_URI, { title: addTitle })
        console.log(bank.data)
        setIsCreateMode(false)
        setAddTitle('')
        // //* Nagaappend ng new object sa array of objects
        // setBanks(prevState => [...prevState, {id: bank.data._id, title: bank.data.title}])
        window.location.reload(false);
        
      } catch (error) {
         console.error(error)
      }
      console.log('submit new bank', addTitle)
    }
  
    const saveBank = () => {
      console.log('save')
    }
    const cancelBank = () => {
        setIsCreateMode(false)
        setAddTitle('')
    }
  
  return(
    <>
      <form onSubmit={submitBank}>
       <div className='flex'>
        <input type="text" id="title" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} className="rounded-2xl mr-4 flex appearance-none py-4 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:border-[#e2a591] focus:border-[#DBA390] focus:border-transparent" name="title" placeholder="Bank Title" required/>
        <button type="submit" onClick={saveBank} className='flex justify-center bg-transparent items-center rounded-2xl font-semibold mr-4'>
          <IoAddCircleOutline className='text-white text-4xl m-0'/>
        </button>
        <button onClick={cancelBank} className='flex justify-center bg-transparent items-center rounded-2xl font-semibold'>
          <IoClose className='text-white text-4xl m-0'/>
        </button>
      </div>    
      </form>
    </>
  )
}

function QuestionBanks() {
  //* Dito maiistore lahat ng question banks
  //* Type: Array of Objects
  const [banks, setBanks] = useRecoilState(banksState)
  const isCreateMode = useRecoilValue(createModeState)
  const navigate = useNavigate()
  
  //* Get all question banks on initial render
  useEffect(() => {
    const getBanks = async () => {
        try {
            const banks = await axios.get(BANKS_URI)
            
            let fetchedBanks = banks.data.map(data => {
                return { id: data._id, title: data.title, questions: data.questions }
            })
            
            setBanks(fetchedBanks)
        } catch (error) {
            throw new Error(error)
        }
    }
    getBanks()
  }, [])

  const openBank = async (id) => {
      try {
          const bank = await axios.get(BANK_URI.concat(id))
          navigate(`/faculty/banks/${bank.data._id}`)
      } catch (error) {
          throw new Error(error)
      }
      
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full px-5'>
        <h1 className='text-white text-2xl font-bold'>Question Banks</h1>
      </div>
      <div className='button-search flex flex-col gap-4 sm:justify-center items-center md:justify-between md:flex-row w-full px-5'>
        {isCreateMode ? <CreateBankMode/> : <CreateBankButton/>}
        
        <div className="flex relative shadow-lg max-w-[277px] min-h-[56px]">
          <input type="text" id="email-with-icon" className=" rounded-l-2xl flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:border-[#e2a591] focus:border-[#DBA390] focus:border-transparent" name="search-bank" placeholder="Search Question Bank"/>
          <span className="bg-[#7B9EBE] rounded-r-2xl inline-flex cursor-pointer items-center px-5 text-gray-500 shadow-sm text-sm">
            <IoSearchOutline className='text-white text-2xl m-0 border-[#7B9EBE]'/>
          </span>
        </div>
      </div>
     
      <div className="relative w-full h-full p-5 mb-24">
        <div className="grid grid-rows-2 gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center items-center ease-in-out duration-300">
        {banks.map(bank => {
            return <Bank _id={bank.id} open={() => openBank(bank.id)} key={bank.id} title={bank.title} noOfQuestions={bank.questions.length}/>
        })}
        </div>
      </div> 
    </div>
  )
}

export default QuestionBanks
import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import './QuestionBanks.css'
import { IoAddCircleOutline, IoSearchOutline, IoClose } from 'react-icons/io5'

const BANKS_URI = 'http://localhost:7777/api/banks'
const BANK_URI = 'http://localhost:7777/api/banks/'

function Bank(props) {

  return (
    <div className='col basis-2/6 mt-5'>
      <div className="flex flex-col items-center justify-between shadow-lg rounded-[1.2rem] w-full md:w-80 p-4 bg-white relative overflow-hidden min-h-[220px] max-h-[220px]">
        <div className="w-full flex items-center justify-between mb-6 mt-2">
          <h1 className='font-bold'>{props.title}</h1>
          <span className='text-gray-600 bg-[#C8CFCF] rounded-xl py-1 px-5 text-xs'>
            {props.noOfQuestions} Questions
          </span>
        </div>
        <p className='overflow-hidden'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Explicabo ea molestias minus dolore! Dignissimos, eaque 
          Explicabo ea molestias minus dolore! Dignissimos, eaque
        </p>
        <button onClick={props.open} className='bg-[#7B9EBE] hover:bg-[#6e8eac] rounded-xl text-white py-2 px-5 w-full mt-5 transition-all ease-linear delay-[.4ms]'>
          Open
        </button>
      </div>
    </div>
  )
  
}
function CreateBankButton(props) {
  return (
    <>
       <button onClick={props.create} className='flex justify-center items-center btn-create shadow-lg rounded-2xl px-5 py-2 font-semibold'>
        <IoAddCircleOutline className='text-white text-4xl m-0'/>
        <span className='ml-9 mr-3'>Create New Bank</span>
      </button>
    </>
  )
}
function CreateBankMode(props) {
 
  return(
    <>
      <form onSubmit={props.submit}>
       <div className='flex'>
        <input type="text" id="title" value={props.title} onChange={(e) => props.setTitle(e.target.value)} className="rounded-2xl mr-4 flex appearance-none py-4 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:border-[#e2a591] focus:border-[#DBA390] focus:border-transparent" name="title" placeholder="Bank Title" required/>
        <button type="submit" onClick={props.save} className='flex justify-center bg-transparent items-center rounded-2xl font-semibold mr-4'>
          <IoAddCircleOutline className='text-white text-4xl m-0'/>
        </button>
        <button onClick={props.cancel} className='flex justify-center bg-transparent items-center rounded-2xl font-semibold'>
          <IoClose className='text-white text-4xl m-0'/>
        </button>
      </div>    
      </form>
    </>
  )
}

function QuestionBanks() {
  const [banks, setBanks] = useState([])
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [title, setTitle] = useState('')
  const [bankCount, setBankCount] = useState(0)

  useEffect(() => {
    const getBanks = async () => {
        try {
            const banks = await axios.get(BANKS_URI)
            
            let fetchedBanks = banks.data.map(data => {
                return { id: data._id, title: data.title }
            })
           
            setBanks(fetchedBanks)
        } catch (error) {
            throw new Error(error)
        }
    }
    getBanks()
  }, [])

  useEffect(() => {
    console.log(banks)
  }, [banks])
  
  
  const submitBank = async (e) => {
    e.preventDefault()
    try {
      const bank = await axios.post(BANKS_URI, { title: title })
      console.log(bank.data)
      setIsCreateMode(false)
      setTitle('')
      //* Nagaappend ng new object sa array of objects
      setBanks(prevState => [...prevState, {id: bank.data._id, title: bank.data.title}])
      
    } catch (error) {
       console.error(error)
    }
  }

  const createNewBank = () => {
    console.log('create')
      setIsCreateMode(true)
  }
  const saveBank = () => {
    console.log('save')
  }
  const cancelBank = () => {
      setIsCreateMode(false)
      setTitle('')
  }
  const openBank = async (id) => {
      try {
          const bank = await axios.get(BANK_URI.concat(id))
          console.log(bank.data)
      } catch (error) {
          throw new Error(error)
      }
  }
  return (
    <>
      <div>
        <h1 className='text-white text-2xl font-bold'>Question Banks</h1>
      </div>
      <div className='button-search flex justify-between w-[90%]'>
        {isCreateMode ? 
          <CreateBankMode save={saveBank} cancel={cancelBank} submit={submitBank} title={title} setTitle={setTitle}/>
          : 
          <CreateBankButton create={createNewBank}/>
        }
        
        <div className="flex relative shadow-lg">
          <input type="text" id="email-with-icon" className=" rounded-l-2xl flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:border-[#e2a591] focus:border-[#DBA390] focus:border-transparent" name="search-bank" placeholder="Search Question Bank"/>
          <span className="bg-[#7B9EBE] rounded-r-2xl inline-flex cursor-pointer items-center px-5 text-gray-500 shadow-sm text-sm">
            <IoSearchOutline className='text-white text-2xl m-0 border-[#7B9EBE]'/>
          </span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap w-full">
           {/* <div className="flex flex-row -mx-1 lg:-mx-4">
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"> */}
            {banks.map(bank => {
                return <Bank open={() => openBank(bank.id)} key={bank.id} title={bank.title} noOfQuestions='17'/>
            })}
          {/* </div>
        </div>*/}
      </div> 
    </>
  )
}

export default QuestionBanks
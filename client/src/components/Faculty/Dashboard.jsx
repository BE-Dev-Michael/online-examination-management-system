import React, {useEffect} from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiFileList2Line } from 'react-icons/ri'
import axios from 'axios'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import getUserData from '../Auth/authService'

const BANKS_URI = `${process.env.REACT_APP_BASE_URL}/api/banks`
const EXAMS_URI = `${process.env.REACT_APP_BASE_URL}/api/exams`

const dashboardTotalBanksState = atom({
  key: 'dashboardTotalBanksState',
  default: 0
})
const dashboardTotalExamsState = atom({
  key: 'dashboardTotalExamsState',
  default: 0
})

function TotalQuestionBanksCard() {
  const totalBanks = useRecoilValue(dashboardTotalBanksState)

  return(
    <div class="bg-white overflow-hidden shadow-xl rounded-3xl w-60 md:w-72 relative py-5">
      <BsBoxSeam className='h-24 w-24 absolute opacity-50 -top-6 -right-6 md:-right-4 text-[#6590E5]'/>
      {/* <img src="https://img.clankapp.com/symbol/btc.svg" alt="btc logo" class="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"/> */}
      <div className="px-4 py-5 sm:p-6">
          <dl>
              <dt className="text-sm leading-5 font-bold text-gray-500 truncate">
                  Total Question Banks
              </dt>
              <dd className="mt-4 ml-4 text-6xl leading-9 font-bold text-[#6590E5]">
                  {totalBanks}
              </dd>
          </dl>
      </div>
    </div>
  )
}
function TotalExamsCard() {
  const totalExams = useRecoilValue(dashboardTotalExamsState)

  return(
    <div class="bg-white overflow-hidden shadow-xl rounded-3xl w-60 md:w-72 relative py-5">
      <RiFileList2Line className='h-24 w-24 absolute opacity-50 -top-6 -right-6 md:-right-4 text-[#6590E5]'/>
      {/* <img src="https://img.clankapp.com/symbol/btc.svg" alt="btc logo" class="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"/> */}
      <div className="px-4 py-5 sm:p-6">
          <dl>
              <dt className="text-sm leading-5 font-bold text-gray-500 truncate">
                  Total Exams
              </dt>
              <dd className="mt-4 ml-4 text-6xl leading-9 font-bold text-[#6590E5]">
                  {totalExams}
              </dd>
          </dl>
      </div>
    </div>
  )
}
function Dashboard() {
  const [, setTotalBanks] = useRecoilState(dashboardTotalBanksState)
  const [, setTotalExams] = useRecoilState(dashboardTotalExamsState)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { _id } = await getUserData()
      const banksData = await axios.get(BANKS_URI.concat(`/all/${_id}`))
      const examsData = await axios.get(EXAMS_URI.concat(`/all/${_id}`))
      setTotalBanks(banksData.data.length)
      setTotalExams(examsData.data.length)
    }
    fetchDashboardData()
  }, [])
  

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full px-5'>
        <h1 className='text-white text-2xl font-bold'>Dashboard</h1>
      </div>
      <div className='w-[90%] mx-auto'>
        <div className='flex justify-start gap-24 md:flex-row flex-col'>
          <TotalQuestionBanksCard/>
          <TotalExamsCard/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import { MdMailOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'

function EmailSent() {
  const { email } = useParams()

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="container relative shadow-xl rounded-2xl max-w-md m-auto p-5">
        <div className='flex flex-col justify-center items-center'>
          <MdMailOutline className='text-7xl'/>
          <h1 className='text-lg font-bold'>We have sent a verification email to:</h1>
          <h1 className='text-md font-semibold'>{email}</h1>
        </div>
        <div className='mt-5'>
          <p className='text-sm text-center'>
            Go to your inbox and click the link to verify your account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailSent
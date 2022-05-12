import React, { useState, useEffect } from 'react'
import { MdCheckCircleOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function VerifiedEmail() {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
    {validUrl ? 
      <div className="flex justify-center items-center h-screen ">
        <div className="container relative shadow-xl rounded-2xl max-w-md m-auto p-5">
          <div className='flex flex-col justify-center items-center'>
            <MdCheckCircleOutline className='text-7xl text-green-500'/>
            <h1 className='text-lg font-bold'>Your email has been verified successfully!</h1>
         </div>
          <div className='mt-5 text-center'>
            <span className='text-center'>Click <a href={`http://localhost:3000/login`} className='text-blue-600'>here</a> to proceed on login page</span>
          </div>
        </div>
      </div>
    : <div> <h1 className='font-bold'>404 Not Found</h1></div>}
    </>
  )
}

export default VerifiedEmail
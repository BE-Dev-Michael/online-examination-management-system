import { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import tokenState from './tokenAtom'

const LOGIN_URI = `${ process.env.REACT_APP_BASE_URL }/api/users/login`

function LoginItems() {
  const initialValue = {
    emailOrUname: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialValue)
  const [formError, setFormError] = useState('')
  const [showEye, setShowEye] = useState(false)
  const navigate = useNavigate()
  const [token, setToken] = useRecoilState(tokenState)

  const formDataHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // if (name === 'email' || name === 'username') {
    //   //* If sa username or email field nagtatype si user call this function
    //   checkIfAlreadyExists(name, value)
  }

  const toggle = () => {
    setShowEye(!showEye)
  }

  const signInHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URI, formData)
      localStorage.setItem("token", response.data.token);

      if (response.data.user.role === 'Faculty') {
        navigate('/faculty')
      } else {
        navigate('/student')
      }
    } catch (err) {
      console.error(err.response.data)
      setFormError(err.response.data)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className=" w-72">
        <form action="#" autoComplete="off" onSubmit={signInHandler}>
          {formError !== '' ? <div class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4 mb-2" role="alert">
            <p class="font-bold">
              {formError}
            </p>
          </div> : ''}
          <div className="flex flex-col mb-6">
            <label className="font-medium text-base text-slate-500 mb-1">Username or email address</label>
            <div className="flex relative ">
              <input value={formData.emailOrUname}
                onChange={formDataHandler}
                name="emailOrUname"
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col mb-10 relative">
            <label className="font-medium text-base text-slate-500 mb-1">Password</label>
            <div className="flex relative ">
              <input value={formData.password}
                onChange={formDataHandler}
                name="password"
                type={(showEye === false) ? 'password' : 'text'}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              />
            </div>
            <div className='text-2xl absolute top-9 right-2'>
              {(showEye === false) ?
                <AiFillEye onClick={toggle} className="text-slate-500" /> :
                <AiFillEyeInvisible onClick={toggle} className="text-slate-500" />}
            </div>

            <div className="flex flex-row-reverse  mt-2">
              <a href="#" className='hover:text-sky-400 font-semibold text-base text-slate-500'>forgot password?</a>
            </div>
          </div>


          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 px-4  bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full ">
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center mt-6">
        <span className="inline-flex items-center text-sm font-light text-center text-gray-500 ">
          Don't have an account?
        </span>
        <a href="#" onClick={() => navigate('/signup')} className="inline-flex items-center text-md font-light text-center ml-1 text-gray-500 hover:text-sky-400" >
          Sign Up
        </a>
      </div>
    </div>
  )
}

export default LoginItems
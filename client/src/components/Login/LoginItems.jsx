import { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

function LoginItems() {
  const initialValue = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialValue)
  const [showEye, setShowEye] = useState(false)

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

  const SignInHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className=" w-72">
        <form action="#" autoComplete="off" onSubmit={SignInHandler}>

          <div className="flex flex-col mb-6">
            <label className="font-medium text-base text-slate-500 mb-1">Email</label>
            <div className="flex relative ">
              <input value={formData.email}
                onChange={formDataHandler}
                name="email"
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                placeholder="Enter your email" />
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
                placeholder="Enter your password" />
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
        <a href="#" className="inline-flex items-center text-md font-light text-center ml-1 text-gray-500 hover:text-sky-400" >
          Sign Up
        </a>
      </div>
    </div>
  )
}

export default LoginItems
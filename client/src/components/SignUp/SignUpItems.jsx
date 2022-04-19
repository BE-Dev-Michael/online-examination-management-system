import { useState, useEffect } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai' // import eye icons

const SIGNUP_URI = 'http://localhost:7777/api/users/signup'
const FETCH_ALL_URI = 'http://localhost:7777/api/users'

function SignUpItems() {
  const initialValue = {
    username: '',
    email: '',
    password: '',
    role: ''
  }
  const [formData, setFormData] = useState(initialValue) //state for handling data fields
  const [formErrors, setFormErrors] = useState({}) // state for handling errors in each fields
  const [isSubmit, setIsSubmit] = useState(false)
  const [showEye, setShowEye] = useState(false) // useState for eye icons
  const [fetchUsers, setFetchUsers] = useState([])
  const [realTimeErrors, setRealTimeErrors] = useState({ emailError: null, usernameError: null })
  const [isAlreadyExists, setIsAlreadyExists] = useState(false)

  // get value in each field
  const formDataHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // form submit button
  const signUpSubmit = (e) => {
    e.preventDefault()
    setFormErrors(formValidation(formData))
    setIsSubmit(true)
  }

  // validate each field
  const formValidation = (data) => {
    const errors = {}
    const validator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if (!data.username) {
      errors.username = "Username is required!"
    }
    if (!data.email) {
      errors.email = "Email is required!"
    } else if (!validator.test(data.email)) {
      errors.email = "This is not a valid email format!"
    }
    if (!data.password) {
      errors.password = "Password is required!"
    } else if (data.password.length < 4) {
      errors.password = "Password must be more than 4 characters."
    }
    if (!data.role) {
      errors.role = "Select User type."
    }

    return errors
  }

  //toggle eye icons show/hide
  const toggle = () => {
    setShowEye(!showEye)
  }

  // to check if there is no error and submit is clicked
  // this renders every changes is made
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData)
    }
  }, [formErrors])

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className="mt-2 w-72">
        <form action="#" autoComplete="off" onSubmit={signUpSubmit} >
          <div className="flex flex-col mb-6">
            <label className="font-medium text-base text-slate-500 mb-1">Username</label>
            <div className="flex relative ">
              <input value={formData.username}
                onChange={formDataHandler}
                name="username"
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your username" />
            </div>
            <p className="text-red-600 text-sm font-normal ml-1">{formErrors.username}</p>
          </div>


          <div className="flex flex-col mb-6">
            <label className="font-medium text-base text-slate-500 mb-1">Email</label>
            <div className="flex relative ">
              <input value={formData.email}
                onChange={formDataHandler}
                name="email"
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your email" />
            </div>
            <p className="text-red-600 text-sm font-normal ml-1">{formErrors.email}</p>
          </div>

          <div className="flex flex-col mb-6 relative">
            <label className="font-medium text-base text-slate-500 mb-1">Password</label>
            <div className="flex relative ">
              <input value={formData.password}
                onChange={formDataHandler}
                name="password"
                type={(showEye === false) ? 'password' : 'text'}
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your password" />
            </div>
            {/* this div is to show eye icons */}
            <div className='text-2xl absolute top-9 right-2'>
              {(showEye === false) ?
                <AiFillEye onClick={toggle} className="text-slate-500" /> :
                <AiFillEyeInvisible onClick={toggle} className="text-slate-500" />}
            </div>

            <p className="text-red-600 text-sm font-normal ml-1">{formErrors.password}</p>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-medium text-base text-slate-500 mb-1">User Role</label>

            <div className="flex justify-evenly ">
              <div className="font-medium text-slate-600">
                <input
                  onChange={formDataHandler}
                  type="radio"
                  value="Student"
                  name="role"
                /> Student
              </div>
              <div className="font-medium text-slate-600">
                <input
                  onChange={formDataHandler}
                  type="radio"
                  value="Faculty"
                  name="role"
                /> Faculty
              </div>
            </div>
            <p className="text-red-600 text-sm font-normal ml-1">{formErrors.role}</p>
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 px-4  bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full ">
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center mt-6">
        <span className="inline-flex items-center text-sm font-light text-center text-gray-500 ">
          Already have an account?
        </span>
        <a href="#" className="inline-flex items-center text-md font-light text-center ml-1 text-gray-500 hover:text-sky-400" >
          Signin
        </a>
      </div>
    </div>
  )
}

export default SignUpItems
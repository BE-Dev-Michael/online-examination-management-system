import React from 'react'

function SignUpItems() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className="mt-2 w-72">
        <form action="#" autoComplete="off" >

          <div className="flex flex-col mb-2">
            <label className="font-normal mb-2">Username</label>
            <div className="flex relative ">
              <input required
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your username" />
            </div>
          </div>


          <div className="flex flex-col mb-2">
            <label className="font-normal mb-2">Email</label>
            <div className="flex relative ">
              <input required
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your email" />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-normal mb-2">Password</label>
            <div className="flex relative ">
              <input required
                type="password"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your password" />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-normal mb-2">User Role</label>
            <div className="flex justify-evenly ">
              <div className="font-medium">
                <input
                  type="radio"
                  value="Student"
                  name="user-role"
                /> Student
              </div>
              <div className="font-medium">
                <input
                  type="radio"
                  value="Faculty"
                  name="user-role"
                /> Faculty
              </div>
            </div>
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
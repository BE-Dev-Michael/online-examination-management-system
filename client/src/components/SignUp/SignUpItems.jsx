import React from 'react'

function SignUpItems() {
  return (
    <div>
       <div className=" relative ">
       <label htmlFor="name-with-label" className="text-gray-700">
          Email
      </label>
      
      <input 
        type="text" 
        id="name-with-label" 
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
        name="email" 
        placeholder="Your name"
      />
      </div>
      <div className=" relative ">
        <label htmlFor="with-indications" className="text-gray-700">
            Password
            <span className="text-red-500 required-dot">
                *
            </span>
        </label>
        <input 
          type="text" id="with-indications" 
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          name="passwor" 
          placeholder="Password"
          />
      </div>
      <div className=" relative ">
        <label htmlFor="with-indications" className="text-gray-700">
            Confirm Password
            <span className="text-red-500 required-dot">
                *
            </span>
        </label>
        <input 
          type="text" id="with-indications" 
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
          name="passwor" 
          placeholder="Password"
          />
      </div>
    </div>
  )
}

export default SignUpItems
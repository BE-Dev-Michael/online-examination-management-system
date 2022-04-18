import React from 'react'

function Card({ children }) {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="container relative shadow-lg rounded-2xl  bg-white max-w-sm m-auto p-5">
        {children}
      </div>
    </div>
  )
}

export default Card
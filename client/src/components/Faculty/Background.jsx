import React from 'react'

function Background({children}) {
  return (
    <div className='bank-page relative w-screen h-screen p-5 overflow-hidden'>
      <div className='flex gap-4'>
        {children}
      </div>
    </div>
  )
}

export default Background
import React from 'react'

function Background({children}) {
  return (
    <div className='bank-page relative w-screen h-screen p-1 overflow-hidden'>
      <div className='flex justify-between'>
        {children}
      </div>
    </div>
  )
}

export default Background
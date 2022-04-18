import React from 'react'

function CardHeader(props) {
  return (
    <div className={`shadow-md rounded-full p-5 ${ props.className }`}>
      <h1 className='text-center'>{props.text}</h1>
    </div>
  )
}

export default CardHeader
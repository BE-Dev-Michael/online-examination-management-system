import React from 'react'

function BannerImage(props) {
  return (
    <div>
      <img src={props.src} alt="" className="absolute lg:h-screen sm:h-max w-full object-cover z-0"/>
      {/* <div className="inset-0 bg-black opacity-25 absolute"></div> */}
    </div>
  )
}

export default BannerImage
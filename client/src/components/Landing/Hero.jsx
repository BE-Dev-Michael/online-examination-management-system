import React from 'react'
import BannerImage from "../Reusable/BannerImage"
function Hero() {
  return (
    <div className="bg-white relative h-screen">
        {/* //* BannerImage is a reusable component */}
        {/* //* Modify the src value if maglalagay ng ibang image */}
        <BannerImage src="https://wallpapercave.com/wp/wp4072615.jpg"/>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
            <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
                <span className="font-bold uppercase text-yellow-400">
                    Himalaya
                </span>
                <h1 className="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4">
                    Let yourself be carried
                    <br/>
                        by nature
                </h1>
                <a href="#" className="block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10">
                    Discover
                </a>
            </div>
        </div>
    </div>
  )
}

export default Hero
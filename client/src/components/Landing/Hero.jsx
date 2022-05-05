import React from 'react'
import BannerImage from "../Reusable/BannerImage"
import KeyFeatures from './KeyFeatures';
import UserFeatures from './UserFeatures';
import CTA from './CTA';
import Footer from './Footer';
import '../../custom-font.css';


function Hero() {
  return (
    <div className="relative h-screen grid">
        <BannerImage src="../../images/hero-bg-1.png"/>
        <div className="container mx-auto px-6 md:px-12 sm:pb-6 relative z-10 grid items-center py-32 xl:py-40 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            {/* <div className="lg:w-2/5 xl:w-3/5 flex flex-col items-start relative z-10"> */}
                <h1 className="w-full h-auto font-bold sm:text-[#414141] text-6xl sm:text-6xl md:text-white leading-tight mt-4 lg:grid lg:gap-4 sm:text-center md:text-left font-['Cocon']">
                    Online Examination Platform
                </h1>
            <div className="lg:w-5/5 xl:w-5/5 md:mt-10 sm:mt-10 flex flex-col items-start relative z-10 lg:row-span-3">
                <img src="../../images/laptop-1.png" className=""/>
            </div>
            <h2 className="md:text-white sm:text-[#414141] sm:mt-16 mt-5 text-md lg:col-span-1 md:col-span-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem labore laboriosam 
                quibusdam quia assumenda commodi eligendi voluptatum veniam, provident dolores aliquid, 
                sint cupiditate? Neque sit, illo quas ipsum inventore a!
            </h2>
            <a href="#" className="md:hover:bg-white md:hover:text-[#414141] sm:hover:bg-[#7c9ebe] py-2 px-7 text-lg md:text-[#fcfcfc] sm:text-[#7c9ebe] sm:hover:text-white font-bold mt-10 rounded-full text-base border-2 md:border-[#fcfcfc] sm:border-[#7c9ebe] w-fit">
                Sign Up
            </a>
            
            {/* </div> */}
            
        </div>

        <KeyFeatures/>

        <UserFeatures/>

        <CTA/>

        <Footer/>

    </div>
    
  )
}

export default Hero
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
        <div className="bg-gradient-to-r from-[#a1c4fc] to-[#c1e8fb] mx-auto px-8 md:px-12 xl:pb-34 md:pb-12 sm:pb-16 relative z-10 grid items-center py-32 xl:py-40 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            {/* <div className="lg:w-2/5 xl:w-3/5 flex flex-col items-start relative z-10"> */}
                <h1 className="w-full h-auto font-bold text-6xl sm:text-6xl text-[#fcfcfc] leading-tight mt-4 lg:grid lg:gap-4 sm:text-center md:text-left font-['Cocon']">
                    Simple Online Examination Platform
                </h1>
            <div className="lg:w-5/5 xl:w-5/5 md:mt-10 sm:mt-10 flex flex-col items-start relative z-10 lg:row-span-3">
                <img src="../../images/laptop-1.png" className=""/>
            </div>
            <h2 className="text-[#fcfcfc] sm:mt-16 mt-5 text-md lg:col-span-1 md:col-span-2">
                Testdeck caters to both teachers and students to create and conduct examinations
                online.
            </h2>
            <a href="#" className="hover:bg-white hover:text-[#414141] py-2 px-7 text-lg text-[#fcfcfc] font-bold mt-10 rounded-full text-base border-2 border-[#fcfcfc] w-fit sm:justify-self-center md:justify-self-start">
                Sign Up
            </a>
        </div>

        <KeyFeatures/>

        <UserFeatures/>

        <CTA/>

        <Footer/>

    </div>
    
  )
}

export default Hero
import React from 'react'
import BannerImage from "../Reusable/BannerImage"
function Hero() {
  return (
    <div className="relative h-screen">
        <BannerImage src="../../images/hero-bg-1.png"/>
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid items-center py-32 xl:py-40 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            {/* <div className="lg:w-2/5 xl:w-3/5 flex flex-col items-start relative z-10"> */}
                <h1 className="w-full h-auto font-bold text-6xl sm:text-6xl text-white leading-tight mt-4 lg:grid lg:gap-4 sm:text-center md:text-left">
                    Online Examination Platform
                </h1>
            <div className="lg:w-5/5 xl:w-5/5 md:mt-10 sm:mt-10 flex flex-col items-start relative z-10 lg:row-span-3">
                <img src="../../images/laptop-1.png" className=""/>
            </div>
            <h2 className="md:text-white sm:text-[#414141] mt-5 text-md lg:col-span-1 md:col-span-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem labore laboriosam 
                quibusdam quia assumenda commodi eligendi voluptatum veniam, provident dolores aliquid, 
                sint cupiditate? Neque sit, illo quas ipsum inventore a!
            </h2>
            <a href="#" className="md:hover:bg-white md:hover:text-[#414141] sm:hover:bg-[#7c9ebe] py-2 px-7 text-lg md:text-[#fcfcfc] sm:text-[#7c9ebe] sm:hover:text-white font-bold mt-10 rounded-full text-base border-2 md:border-[#fcfcfc] sm:border-[#7c9ebe] w-fit">
                Sign Up
            </a>
            
            {/* </div> */}
            
        </div>

        
{/* <div class="p-4 max-w-5xl grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 bg-[#fcfcfc] place-items-center min-h-screen self-center">
    <div class="w-3/4 md:h-2/4 sm:h-3/4 px-4 py-4 bg-white mt-6 items-start shadow-lg rounded-lg bg-white md:mt-30 rounded-3xl">
        <div class="flex-shrink-0 mt-5">
            <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" class="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold text-[#414141] py-4 mt-8">
            Website Design
        </h3>
        <p class="text-md  text-gray-500 text-[#414141] py-4">
            Encompassing today’s website design technology to integrated and build solutions relevant to your business.
        </p>
    </div>
    <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" class="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            Branding
        </h3>
        <p class="text-md text-gray-500 dark:text-gray-300 py-4">
            Share relevant, engaging, and inspirational brand messages to create a connection with your audience.
        </p>
    </div>

    <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" class="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            SEO Marketing
        </h3>
        <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
            Let us help you level up your search engine game, explore our solutions for digital marketing for your business.
        </p>
    </div>
</div> */}

    </div>
    
  )
}

export default Hero
import React from 'react';

function Footer () {
    return (
        
        <footer class="px-3 py-8 pt-36 pb-16 bg-[#414141] text-2 text-gray-500 dark:text-gray-200 transition-colors duration-200 z-10">

        {/* <div class="flex bg-gradient-to-r from-[#a1c4fc] to-[#c1e8fb] bg-gray-300 z-20 w-2/4 place-self-center rounded-3xl">
        <div class="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-6 sm:px-6 lg:py-16 lg:px-4 z-20">
            <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                <span className="block font-['Cocon']">
                    Online Examination Platform
                </span>
                <span class="block text-indigo-500 text-sm mt-2">
                    It&#x27;s today or never.
                </span>
            </h2>
            <div class="lg:mt-0 lg:flex-shrink-0">
                <div class=" inline-flex rounded-full shadow h-fit">
                    <button type="button" class="py-4 px-6 bg-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-[#c1e8fb] w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full ">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
        </div> */}
            
            <div class="flex flex-col">
                <div class="md:hidden mt-7 mx-auto w-11 h-px rounded-full bg-slate-300">
                </div>
                <div class="mt-4 md:mt-0 flex flex-col md:flex-row">
                    <nav class="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-100 md:pr-5">
                        <a aria-current="page" href="#" class="hover:text-[#c1e8fb]">
                            Home
                        </a>
                        <a aria-current="page" href="#" class="hover:text-[#c1e8fb]">
                            About
                        </a>
                        {/* <a aria-current="page" href="#" class="hover:text-gray-700 dark:hover:text-white">
                            Customization
                        </a> */}
                    </nav>
                    <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full">
                    </div>
                    <div class="mt-4 md:mt-0 flex-1 flex items-center justify-center md:border-r border-[#fcfcfc] py-5">
                        {/* <a class="hover:text-primary-gray-20" href="/">
                            <span class="sr-only">
                                View on GitHub
                            </span>
                            <img src="../../images/logo-w.png" alt="testdeck logo" className="w-2/5 h-auto"/>
                        </a> */}
                        <a className="flex-shrink-0" href="/"> 
                            <img src="../../images/logo-w.png" alt="testdeck logo" className="w-28 h-auto"/>
                        </a>

                        {/* <a class="ml-4 hover:text-primary-gray-20" href="#">
                            <span class="sr-only">
                                Settings
                            </span>
                            <svg width="30" height="30" fill="currentColor" class="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M960 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm768 512q0-52-38-90t-90-38-90 38-38 90q0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm0-1024q0-52-38-90t-90-38-90 38-38 90q0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm-384 421v185q0 10-7 19.5t-16 10.5l-155 24q-11 35-32 76 34 48 90 115 7 11 7 20 0 12-7 19-23 30-82.5 89.5t-78.5 59.5q-11 0-21-7l-115-90q-37 19-77 31-11 108-23 155-7 24-30 24h-186q-11 0-20-7.5t-10-17.5l-23-153q-34-10-75-31l-118 89q-7 7-20 7-11 0-21-8-144-133-144-160 0-9 7-19 10-14 41-53t47-61q-23-44-35-82l-152-24q-10-1-17-9.5t-7-19.5v-185q0-10 7-19.5t16-10.5l155-24q11-35 32-76-34-48-90-115-7-11-7-20 0-12 7-20 22-30 82-89t79-59q11 0 21 7l115 90q34-18 77-32 11-108 23-154 7-24 30-24h186q11 0 20 7.5t10 17.5l23 153q34 10 75 31l118-89q8-7 20-7 11 0 21 8 144 133 144 160 0 8-7 19-12 16-42 54t-45 60q23 48 34 82l152 23q10 2 17 10.5t7 19.5zm640 533v140q0 16-149 31-12 27-30 52 51 113 51 138 0 4-4 7-122 71-124 71-8 0-46-47t-52-68q-20 2-30 2t-30-2q-14 21-52 68t-46 47q-2 0-124-71-4-3-4-7 0-25 51-138-18-25-30-52-149-15-149-31v-140q0-16 149-31 13-29 30-52-51-113-51-138 0-4 4-7 4-2 35-20t59-34 30-16q8 0 46 46.5t52 67.5q20-2 30-2t30 2q51-71 92-112l6-2q4 0 124 70 4 3 4 7 0 25-51 138 17 23 30 52 149 15 149 31zm0-1024v140q0 16-149 31-12 27-30 52 51 113 51 138 0 4-4 7-122 71-124 71-8 0-46-47t-52-68q-20 2-30 2t-30-2q-14 21-52 68t-46 47q-2 0-124-71-4-3-4-7 0-25 51-138-18-25-30-52-149-15-149-31v-140q0-16 149-31 13-29 30-52-51-113-51-138 0-4 4-7 4-2 35-20t59-34 30-16q8 0 46 46.5t52 67.5q20-2 30-2t30 2q51-71 92-112l6-2q4 0 124 70 4 3 4 7 0 25-51 138 17 23 30 52 149 15 149 31z">
                                </path>
                            </svg>
                        </a> */}
                    </div>
                    <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full ">
                    </div>
                    <div class="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
                        <span class="">
                            © 2022
                        </span>
                        <span class="mt-7 md:mt-1">
                            Created by devTeam
                            {/* <a class="underline hover:text-primary-gray-20" href="https://www.linkedin.com/in/crabiller/">
                                Charlie
                            </a> */}
                        </span>
                    </div>
                </div>
            </div>
        </footer>



    );
}
 
export default Footer;
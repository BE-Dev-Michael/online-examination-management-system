import React from 'react';

function KeyFeatures() {
    return(
        <div className="z-10 bg-[#fcfcfc] grid">
            <h2 className="text-2xl mt-24 mb-8 text-center text-[#414141] font-['Cocon'] font-semibold">
                testdeck Key features
            </h2>
            <div class="p-4 lg:w-4/5 md:w-full grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center min-h-fit place-self-center h-fit">
                <div class="xl:w-3/4 lg:w-4/5 h-fit md:w-3/4 px-4 py-4 bg-white mt-6 items-start shadow-lg rounded-3xl md:mt-30 rounded-3xl">
                    <div class="flex-shrink-0 mt-5">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-b from-[#f74f98] to-[#fcb660] text-white shadow-lg shadow-rose-300">
                        <img src="../images/card-based.png" alt="card-based" className="w-8 h-8"/>
                        </div>
                    </div>
                    <h3 class="font-['Cocon'] text-xl sm:text-lg text-['#414141'] py-4 mt-6">
                        Card-based Design
                    </h3>
                    <hr className= "border-[#f98879] border-2 rounded-md w-14"></hr>
                    <p class="text-sm  text-gray-500 text-[#414141] py-4 mr-5 mb-2">
                        Minimalistic card-based design promotes efficient content organization, enhances user experience, and great responsiveness for mobile screens.
                    </p>
                </div>

                <div class="xl:w-3/4 lg:w-4/5 h-fit md:w-3/4 px-4 py-4 bg-white mt-6 items-start shadow-lg rounded-3xl md:mt-30 rounded-3xl">
                    <div class="flex-shrink-0 mt-5">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-b from-[#6590e5] to-[#7ed5d9] text-white shadow-lg shadow-blue-300">
                            <img src="../images/ui-design.png" alt="easy to learn" className="w-8 h-8"/>
                        </div>
                    </div>
                    <h3 class="font-['Cocon'] text-xl sm:text-lg text-['#414141'] py-4 mt-6">
                        Easy to learn
                    </h3>
                    <hr className= "border-[#74bade] border-2 rounded-md w-14"></hr>
                    <p class="text-sm  text-gray-500 text-[#414141] py-4 mr-5 mb-5">
                        Testdeck has a simple user-friendly interface that helps users to navigate and utilize the platform with ease and prevent user errors.
                    </p>
                </div>

                <div class="xl:w-3/4 lg:w-4/5 h-fit md:w-3/4 sm:w-2/4 px-4 py-4 bg-white mt-6 items-start shadow-lg rounded-3xl md:mt-30 rounded-3xl sm:col-span-2 md:col-span-1">
                    <div class="flex-shrink-0 mt-5">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-b from-[#f74f98] to-[#fcb660] text-white shadow-lg shadow-rose-300">
                            <img src="../images/devices.png" alt="devices" className="w-8 h-8"/>
                        </div>
                    </div>
                    <h3 class="font-['Cocon'] text-xl sm:text-lg text-['#414141'] py-4 mt-6">
                        Cross-platform Accessibility
                    </h3>
                    <hr className= "border-[#f98879] border-2 rounded-md w-14"></hr>
                    <p class="text-sm  text-gray-500 text-[#414141] py-4 mr-5 mb-8">
                        Access testdeck across different platforms with various operating systems and screen sizes.
                    </p>
                </div>
            </div>
        </div>
    )

}
 
export default KeyFeatures;
import React from 'react'

// Example exam card
const ExamCard = () => {
    return (
        <div className="shadow-lg rounded-xl max-w-xs p-4 border bg-white relative overflow-hidden">
            <a href="#" className="w-full h-full block">
                <div className="w-full">
                    <div className="flex items-center justify-start w-full flex-grow">
                        <a href="#" className="block relative">
                            <img alt="profile" src="https://avatarfiles.alphacoders.com/275/275525.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                        </a>
                        <div className="flex flex-col items-start ml-4">
                            <span className="text-gray-700">
                                Charlie Rabiller
                            </span>
                            <span className="text-gray-400 font-light text-sm">
                                Uploaded 3 mins ago
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-800 text-xl font-medium mb-2">
                        This is where the exam title
                    </p>
                    <p className="text-gray-400 text-xs font-medium mb-2">
                        Sunday 13 october
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                        You’ve been coding for a while now and know your way around a CSS file. You’re certainly no master, but with enough fiddling you can get where you want to go.
                    </p>

                    <button type="button" class="py-2 px-4  bg-[#7B9EBE] hover:bg-[#6e8eac] focus:ring-[#7B9EBE] focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Take exam
                    </button>
                </div>
            </a>
        </div>
    )
}

export default ExamCard
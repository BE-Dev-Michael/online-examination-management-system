import React from 'react'

const InputCode = () => {
    return (
        <div className="relative flex justify-center items-center p-2 lg:h-40 h-32 bg-white border shadow-sm rounded-2xl mb-5 lg:ml-5 ">
            <div className="p-2 max-w-xl min-w-max rounded-lg border border-solid border-gray-300 shadow-md">
                <div className="relative flex w-full">
                    <input type="search" className="flex w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-slate-600 focus:outline-none mr-1" placeholder="Enter exam code" />
                    <button class="px-6 py-2 border-2 text-white text-sm font-medium bg-[#7B9EBE] hover:bg-[#6e8eac] leading-tight rounded-md transition duration-150 ease-in-out" type="button">Enter</button>
                </div>
            </div>
        </div>
    )
}

export default InputCode

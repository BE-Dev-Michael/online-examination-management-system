import React from 'react';
import { useNavigate } from 'react-router-dom'

function CTA() {
    const navigate = useNavigate()
    return (
        <div class="flex bg-gradient-to-r from-[#a1c4fc] to-[#c1e8fb] bg-gray-300 z-20 xl:w-3/5 lg:3/4 md:w-4/5 sm:w-11/12 place-self-center rounded-3xl -mb-20">
            <div class="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-14 lg:px-12 z-20">
                <h2 class="text-3xl text-white sm:text-4xl">
                    <span className="block font-['Cocon']">
                        Online Examination Platform
                    </span>
                    <span class="block text-white text-sm mt-2">
                        Join testdeck by creating an account and start using our examination platform.
                    </span>
                </h2>
                <div class="lg:mt-0 lg:flex-shrink-0">
                    <div class="inline-flex">
                        <button type="button" onClick={() => navigate('/signup')} class="hover:bg-[#74bade] hover:text-[#fcfcfc] py-2 px-7 text-lg text-[#414141] bg-white font-bold rounded-full text-base w-fit shadow-xl sm:mt-5 lg:mt-0">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CTA;
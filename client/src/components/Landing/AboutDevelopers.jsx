import React from 'react'
import {FaTwitter, FaGithub, FaLinkedinIn, FaFacebook} from 'react-icons/fa'

function AboutDevelopers() {
  return (
    
      <div className="relative grid">

        <div className=" relative z-10 bg-gradient-to-r from-[#a1c4fc] to-[#c1e8fb]">
            <div className="grid mx-20 xl:px-34 py-14 md:py-24 sm:py-20 xl:grid-rows-2 md:grid-rows-2 sm:grid-rows-1">
                <h1 className="md:mt-10 sm:mt-12 h-fit text-center font-[Cocon] text-white text-3xl">
                    About Us
                </h1>
                <p className="text-white lg:px-28 md:mx-14 sm:mx-8 md:mt-6 sm:mt-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime explicabo perspiciatis 
                    necessitatibus natus maiores exercitationem illum quo! Eius vel asperiores incidunt inventore 
                    blanditiis, natus illum distinctio esse dolorum laborum vitae.
                </p>
            </div>
        </div>

        <div class="p-4 pb-32 bg-[#fcfcfc] z-10 md:pt-44 sm:pt-56">
            
            <div class="grid md:grid-cols-3 sm:grid-cols-1 md:gap-y-28 sm:gap-y-10 items-center space-y-24 md:space-y-0 flex-col md:flex-row justify evenly justify-items-center">
                <div className="flex justify-items-start items-start">
                    <h2 class="text-left text-5xl font-[Cocon] text-white z-20 mx-20">
                        The
                        <br/>
                        Developers
                    </h2>
                    <div className="-mt-52 -ml-20 z-0 absolute xl:w-2/4 lg:w-3/5 md:w-3/4 self-start shrink-0">
                        <img src="../images/ellipse-orange-gradient.png" alt="ellipse orange gradient"/>
                    </div>
                </div>

                <div class="grid justify-items-center lg:p-4 md:p-2 relative lg:w-11/12 md:w-full sm:w-2/4">
                    <div class="bg-white rounded-2xl shadow-2xl justify-items-center lg:w-11/12 md:w-full sm:w-11/12 h-fit">
                        <div class="absolute text-center mb-4 -top-16 right-1/2 transform translate-x-1/2 justify-self-center h-40 w-40">
                            <div className=" relative">
                                <img alt="Gatchalian Profile" src="../images/GatchalianRAJ.jpg" class="object-cover rounded-full h-40 w-40  border-4 border-white"/>
                            </div>
                        </div>
                        <div class="flex flex-col justify-items-center text-center lg:mt-24 md:mt-28 sm:mt-32">
                            <p class="font-[Cocon] text-lg text-gray-800 text-center">
                                Romeo A. Gatchalian
                            </p>
                            <p class="text-sm align-text-top text-[#F1838A] font-light">
                                Programmer
                            </p>
                            {/* <p class="text-md text-gray-500 w-60 mx-auto py-4 font-light">
                                Patrick Sébastien, born November 14, 1953 in Brive-la-Gaillarde, is an imitator.
                            </p> */}
                            <hr className= "border-[#414141] border-2 rounded-md w-14 self-center mt-3"></hr>
                        </div>
                        <div class="pt-8 flex mb-14 w-40 mx-auto text-gray-500 items-center justify-around">
                            <a href="https://github.com/RomeoGatcha" target="_blank">
                                <FaGithub className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>

                            </a>
                            <a href="https://www.facebook.com/romeo.gatchalian.07" target="_blank">
                                <FaFacebook className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="grid justify-items-center lg:p-4 md:p-2 relative lg:w-11/12 md:w-full sm:w-2/4">
                    <div class="bg-white rounded-2xl shadow-2xl justify-items-center lg:w-11/12 md:w-full sm:w-11/12 h-fit">
                        <div class="absolute text-center mb-4 -top-16 right-1/2 transform translate-x-1/2 justify-self-center h-40 w-40">
                            <div className=" relative">
                                <img alt="Flores Profile" src="../images/FloresJMC.jpg" class="object-cover rounded-full h-40 w-40  border-4 border-white"/>
                            </div>
                        </div>
                        <div class="flex flex-col justify-items-center text-center lg:mt-24 md:mt-28 sm:mt-32">
                            <p class="font-[Cocon] text-lg text-gray-800 text-center">
                                John Michael C. Flores
                            </p>
                            <p class="text-sm align-text-top text-[#F1838A] font-light">
                                Programmer
                            </p>
                            {/* <p class="text-md text-gray-500 w-60 mx-auto py-4 font-light">
                                Patrick Sébastien, born November 14, 1953 in Brive-la-Gaillarde, is an imitator.
                            </p> */}
                            <hr className= "border-[#414141] border-2 rounded-md w-14 self-center mt-3"></hr>
                        </div>
                        <div class="pt-8 flex mb-14 w-40 mx-auto items-center justify-around">
                            <a href="https://github.com/dev-maikeru" target="_blank">
                                <FaGithub className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>

                            </a>
                            <a href="https://www.facebook.com/johnmichaelf777" target="_blank">
                                <FaFacebook className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="grid justify-items-center lg:p-4 md:p-2 relative lg:w-11/12 md:w-full sm:w-2/4">
                    <div class="bg-white rounded-2xl shadow-2xl justify-items-center lg:w-11/12 md:w-full sm:w-11/12 h-fit">
                        <div class="absolute text-center mb-4 -top-16 right-1/2 transform translate-x-1/2 justify-self-center h-40 w-40">
                            <div className=" relative">
                                <img alt="Santos Profile" src="../images/SantosERB.jpg" class="object-cover rounded-full h-40 w-40  border-4 border-white"/>
                            </div>
                        </div>
                        <div class="flex flex-col justify-items-center text-center lg:mt-24 md:mt-28 sm:mt-32">
                            <p class="font-[Cocon] text-lg text-gray-800 text-center">
                                Erish Rey B. Santos
                            </p>
                            <p class="text-sm align-text-top text-[#F1838A] font-light">
                                Programmer
                            </p>
                            {/* <p class="text-md text-gray-500 w-60 mx-auto py-4 font-light">
                                Patrick Sébastien, born November 14, 1953 in Brive-la-Gaillarde, is an imitator.
                            </p> */}
                            <hr className= "border-[#414141] border-2 rounded-md w-14 self-center mt-3"></hr>
                        </div>
                        <div class="pt-8 flex mb-14 w-40 mx-auto text-gray-500 items-center justify-between">
                            <a href="https://github.com/sntserish" target="_blank">
                                <FaGithub className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>

                            </a>
                            <a href="https://www.linkedin.com/in/erish-rey-santos-87911b236/" target="_blank">
                                <FaLinkedinIn className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>

                            </a>
                            <a href="https://www.facebook.com/santos.erishrey" target="_blank">
                                <FaFacebook className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="grid justify-items-center lg:p-4 md:p-2 relative lg:w-11/12 md:w-full sm:w-2/4">
                    <div class="bg-white rounded-2xl shadow-2xl justify-items-center lg:w-11/12 md:w-full sm:w-11/12 h-fit">
                        <div class="absolute text-center mb-4 -top-16 right-1/2 transform translate-x-1/2 justify-self-center h-40 w-40">
                            <div className=" relative">
                                <img alt="Simon Profile" src="../images/SimonDP.jpg" class="object-cover rounded-full h-40 w-40  border-4 border-white"/>
                            </div>
                        </div>
                        <div class="flex flex-col justify-items-center text-center lg:mt-24 md:mt-28 sm:mt-32">
                            <p class="font-[Cocon] text-lg text-gray-800 text-center">
                                Dharyl P. Simon
                            </p>
                            <p class="text-sm align-text-top text-[#F1838A] font-light">
                                Programmer
                            </p>
                            {/* <p class="text-md text-gray-500 w-60 mx-auto py-4 font-light">
                                Patrick Sébastien, born November 14, 1953 in Brive-la-Gaillarde, is an imitator.
                            </p> */}
                            <hr className= "border-[#414141] border-2 rounded-md w-14 self-center mt-3"></hr>
                        </div>
                        <div class="pt-8 flex mb-14 w-40 mx-auto text-gray-500 items-center justify-center">
                            <a href="https://www.facebook.com/dharyl.simon" target="_blank">
                                <FaFacebook className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="grid justify-items-center lg:p-4 md:p-2 relative lg:w-11/12 md:w-full sm:w-2/4">
                    <div class="bg-white rounded-2xl shadow-2xl justify-items-center lg:w-11/12 md:w-full sm:w-11/12 h-fit">
                        <div class="absolute text-center mb-4 -top-16 right-1/2 transform translate-x-1/2 justify-self-center h-40 w-40">
                            <div className=" relative">
                                <img alt="Soriaga Profile" src="../images/SoriagaVD.jpg" class="object-cover rounded-full h-40 w-40  border-4 border-white"/>
                            </div>
                        </div>
                        <div class="flex flex-col justify-items-center text-center lg:mt-24 md:mt-28 sm:mt-32">
                            <p class="font-[Cocon] text-lg text-gray-800 text-center">
                                Vincent D. Soriaga
                            </p>
                            <p class="text-sm align-text-top text-[#F1838A] font-light">
                                Programmer
                            </p>
                            {/* <p class="text-md text-gray-500 w-60 mx-auto py-4 font-light">
                                Patrick Sébastien, born November 14, 1953 in Brive-la-Gaillarde, is an imitator.
                            </p> */}
                            <hr className= "border-[#414141] border-2 rounded-md w-14 self-center mt-3"></hr>
                        </div>
                        <div class="pt-8 flex mb-14 w-40 mx-auto text-gray-500 items-center justify-around">
                            <a href="https://github.com/vncnt07" target="_blank">
                                <FaGithub className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>

                            </a>
                            <a href="https://www.facebook.com/vncnt07" target="_blank">
                                <FaFacebook className="h-7 w-7 text-[#F1838A] hover:text-[#414141] transition-colors duration-200"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
  )
}

export default AboutDevelopers
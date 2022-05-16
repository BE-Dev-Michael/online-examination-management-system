import React from 'react';

function UserFeatures () {
    return(
        <div className="z-10 bg-[#fcfcfc] grid">
            <div className="grid grid-cols-1 min-h-fit mt-24 gap-16">   
                <div className="grid md:grid-cols-2 sm:grid-cols-1 my-5">
                    <div className="grid col-span-1 md:items-center lg:items-start">
                        <img src="../../images/teacher.png" alt="teacher image" className="md:w-4/5 sm:w-2/4 h-auto lg:ml-24 md:ml-10 md:my-auto sm:mx-auto"/>
                    </div>
                    <div className="grid justify-items-end text-[#414141] lg:mr-40 md:mr-14 sm:mt-24 md:w-full lg:w-auto sm:w-4/5 sm:place-self-center">
                        <h3 className="font-['Cocon'] text-2xl mb-5 mr-5 w-fit col-span-2 text-bottom h-fit md:place-self-end sm:place-self-center">
                            Teachers
                        </h3>

                        <ul>
                            <li>
                                <div class="flex ">
                                    <div class="grid grid-rows-2 ml-4 justify-items-end">
                                        <h4 class="font-['Cocon'] text-lg leading-6 text-['#414141'] align-text-bottom h-fit place-self-end">
                                            Create Question Banks
                                        </h4>
                                        <p class="text-base leading-6 text-['#414141'] text-right">
                                           Algebra, Georgraphy, Literature, etc. Create your own question bank for any specific topic in your course.
                                        </p>
                                    </div>
                                    <div class="flex flex-shrink-0 justify-items-end w-fit h-fit ml-5">
                                        <img src="../../images/box.png" alt="feature icon" className="h-20 w-20 justify-self-end mt-3"/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="flex ">
                                    <div class="grid grid-rows-2 ml-4 justify-items-end">
                                        <h4 class="font-['Cocon'] text-lg leading-6 text-['#414141'] align-text-bottom h-fit place-self-end">
                                            Create Exams
                                        </h4>
                                        <p class="text-base leading-6 text-['#414141'] text-right">
                                            Create multiple-choice type of exams and share the exam code to your students.
                                        </p>
                                    </div>
                                    <div class="flex flex-shrink-0 justify-items-end w-fit h-fit ml-5">
                                        <img src="../../images/exam.png" alt="feature icon" className="h-20 w-20 justify-self-end mt-3"/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="flex ">
                                    <div class="grid grid-rows-2 ml-4 justify-items-end">
                                        <h4 class="font-['Cocon'] text-lg leading-6 text-['#414141'] align-text-bottom h-fit place-self-end">
                                            Generate Reports
                                        </h4>
                                        <p class="text-base leading-6 text-['#414141'] text-right">
                                            View and print exam results and generate exam with two-dimensional table of specifications. 
                                        </p>
                                    </div>
                                    <div class="flex flex-shrink-0 justify-items-end w-fit h-fit ml-5">
                                        <img src="../../images/report.png" alt="feature icon" className="h-20 w-20 justify-self-end mt-3"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 sm:grid-cols-1 my-5 mb-32">
                <div className="grid justify-items-end text-[#414141] lg:ml-40 md:ml-14 sm:mt-5 lg:w-auto md:w-full sm:w-4/5 sm:place-self-center z-20">
                        <h3 className="font-['Cocon'] text-2xl mb-5 mr-5 w-fit col-span-2 text-bottom h-fit md:place-self-start md:self-end sm:place-self-center">
                            Students
                        </h3>

                        <ul>
                            <li>
                                <div class="flex ">
                                    <div class="flex flex-shrink-0 justify-items-end w-fit h-fit ml-3 mt-6">
                                        <img src="../../images/faq.png" alt="feature icon" className="h-20 w-20 justify-self-end"/>
                                    </div>
                                    <div class="grid grid-rows-2 ml-4 justify-items-end h-fit">
                                        <h4 class="font-['Cocon'] text-lg leading-6 text-['#414141'] align-text-bottom h-fit place-self-start self-end">
                                            Answer Exams
                                        </h4>
                                        <p class="text-base leading-6 text-['#414141'] text-left">
                                            Take an exam by entering a valid exam code and get results right away.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="flex ">
                                    <div class="flex flex-shrink-0 justify-items-end w-fit h-fit ml-3 mt-6">
                                        <img src="../../images/mind.png" alt="feature icon" className="h-20 w-20 justify-self-end"/>
                                    </div>
                                    <div class="grid grid-rows-2 ml-4 justify-items-end h-fit">
                                        <h4 class="font-['Cocon'] text-lg leading-6 text-['#414141'] align-text-bottom h-fit place-self-start self-end">
                                            Focused Thinking
                                        </h4>
                                        <p class="text-base leading-6 text-['#414141'] text-left">
                                            Testdeck's simple and clean design prevents needless distractions 
                                            so you can focus on acing your exams.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            {/* <li>
                                <div class="flex ">
                                    <div class="flex flex-shrink-0 justify-items-end w-fit h-fit ml-3 mt-6">
                                        <img src="../../images/menu-b.png" alt="feature icon" className="w-3/4 h-3/4 justify-self-end"/>
                                    </div>
                                    <div class="grid grid-rows-2 ml-4 justify-items-end h-fit">
                                        <h4 class="font-['Cocon'] text-lg leading-6 text-['#414141'] align-text-bottom h-fit place-self-start self-end">
                                            One-look dashboard
                                        </h4>
                                        <p class="text-base leading-6 text-['#414141'] text-left">
                                            Know everything about your business in a single glance with your new dashboard.
                                        </p>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                        
                    </div>
                    <div className="grid col-span-1 justify-items-end w-fit">
                        <img src="../../images/student.png" alt="teacher image" className="md:w-4/5 sm:w-2/4 h-auto lg:mr-16 md:mr-10 md:my-auto sm:mx-auto"/>
                    </div>
                </div>
            </div> 
        </div>
    )
}
 
export default UserFeatures;
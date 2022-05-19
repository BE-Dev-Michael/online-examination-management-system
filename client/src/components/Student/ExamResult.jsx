import React from 'react'
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function Choices(props) {
    return (
        <>
          {props.correct !== props.answer ?
            <div className={`${ props.answer === props.choice ? 'bg-red-200 dark:bg-[#FF5161]' : '' } ${ props.correct === props.choice ? 'bg-green-200 dark:bg-green-400 dark:text-gray-800' : '' } relative flex items-center text-left p-2 my-1 w-full rounded-md border dark:text-[#e2dddd] dark:border-[#4e5564]`}>
                {props.choice}
                {props.correct === props.choice ? <BsCheckLg className="w-4 h-4 absolute right-0 mr-4 text-slate-600" /> : ''}
                {props.answer === props.choice ? <BsXLg className="w-4 h-4 absolute right-0 mr-4 text-slate-600" /> : ''}
            </div> :
            <div className={`${ props.answer === props.choice ? 'bg-green-200 dark:bg-green-400 dark:text-gray-800' : '' } relative flex items-center text-left p-2 my-1 w-full rounded-md border dark:text-[#e2dddd] dark:border-[#4e5564]`}>
                {props.choice}
                {props.correct === props.choice ? <BsCheckLg className="w-4 h-4 absolute right-0 mr-4 text-slate-600" /> : ''}
            </div>
          }
        </>
    )
}

function ReviewForm({ questions, result }) {
    return (
        <>
            {questions.map((item, index) => {
                return (
                    <div className="relative my-2 mt-5" key={index}>
                        <hr className='dark:border-gray-600' />
                        {/* points */}
                        <div className="absolute p-3 right-0 flex items-center dark:text-[#e2dddd]">
                            <p>{result.answers[index].answer === item.answer ? item.points : '0'} / {item.points}</p>
                        </div>

                        {/* Question and question number */}
                        <div className="p-3 dark:text-[#e2dddd]">
                            <strong>Question {index + 1}</strong>
                            <p>{item.question}</p>
                        </div>

                        {/* choices */}
                        <div className="mx-5">
                            {item.choices.map((choice, i) => {
                                console.log(choice);
                                return <Choices choice={choice} key={i} correct={item.answer} answer={result.answers[index].answer} />
                            })}
                        </div>

                         {/* student answer */}
                        <div className="p-3 dark:text-[#e2dddd]">
                            <strong>Your Answer</strong>
                            <div className="ml-4">
                                <p>{result.answers[index].answer}</p>
                            </div>
                        </div>

                        {/* correct answer */}
                        <div className="p-3 dark:text-[#e2dddd]">
                            <strong>Correct Answer</strong>
                            <div className="ml-4">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    </div>)
            })}
        </>
    )
}


const ExamResult = () => {
    const location = useLocation()
    //* Get result data
    const result = location.state.result
    //* Merge questions and question groups
    const mergedQuestions = result.exam.questions.concat(result.exam.groups)
    //* Get points on each question
    const points = mergedQuestions.map(data => data.points)
    //* Sum up total points
    const totalPoints = points.reduce((prev, curr) => prev + curr, 0)
    //* Question IDs from exam (Not Shuffled)
    const unshuffledIds = mergedQuestions.map(question => question._id)
    //* Returns a new array based on the sequence of shuffled questions
    const sortedQuestions = result.answers.map(data => {
      const index = unshuffledIds.indexOf(data.id)
      return mergedQuestions[index]
    })
    
    // sample examination just for display
    const examination = {
        title: "Midterm Examination in Programming 1",
        instruction: `HONESTY AND NON – DISCLOSURE AGREEMENT.
        1. I affirm that I will not give or receive any unauthorized help on these examinations/activities and all will be accomplished by myself only.
        2. I affirm and commit not to confer with my classmates my answers to all examinations/activities and will never divulge the contents of these examinations/activities and anybody who are/will be taking the same subject.
        3. I understand that if I am caught or traced to have copied from my classmates or plagiarized my answers, that this is equivalent to a failing grade in the particular examination/activity and/or other sanctions as stipulated in the Undergraduate Student Manual.
        If you AGREE with the agreement, you can proceed to the Midterm Exam.`,
        limit: 1,
        questions: 60,
        totalPoints: 60,
        questionaire: [{
            question: "What is the full meaning of DOM?",
            choices: {
                a: "Document Object Model",
                b: "Dynamic Object Model",
                c: "Document Oriented Modulus",
                d: "Document Oriented Model"
            },
            correctAnswer: "Document Object Model",
            yourAnswer: "Dynamic Object Model",
            points: 2
        }, {
            question: "The program that translates your code from a high-level language to the binary language is called ________",
            choices: {
                a: "programmer",
                b: "compiler",
                c: "translator",
                d: "linker"
            },
            correctAnswer: "compiler",
            yourAnswer: "compiler",
            points: 2
        }, {
            question: " In JavaScript, what is a block of statement?",
            choices: {
                a: "Conditional block",
                b: "block that combines a number of statements into a single compound statement",
                c: "both conditional block and a single statement",
                d: "block that contains a single statement"
            },
            correctAnswer: "block that combines a number of statements into a single compound statement",
            yourAnswer: "block that contains a single statement",
            points: 2
        }]

    }

    return (
        <div className="flex-col justify-center h-full w-screen mx-5 mb-5">
            <div className="relative flex justify-center w-full shadow-sm border rounded-2xl bg-white dark:bg-[#1e2027] dark:border-[#292d35] ">

                <div className="relative lg:flex justify-center w-10/12 xl:w-6/12">
                    <div className="flex flex-col my-5 lg:w-11/12 border p-5 rounded-sm shadow-lg dark:bg-[#26292F] dark:border-[#26292F]">

                        <div className="flex-col mb-5">

                            {/* title and question score */}
                            <div className="flex">
                                <div className="grow">
                                    <p className="font-bold text-lg dark:text-[#e2dddd]">{result.exam.title}</p>
                                </div>
                                <div className="flex-none dark:text-[#e2dddd]">
                                    <p>
                                        <strong className="text-xl text-green-500">{result.score}</strong>
                                        <strong> / {totalPoints}</strong>
                                    </p>
                                </div>
                            </div>

                            <div className="dark:text-[#e2dddd]">
                                <p>
                                    <strong >Remark: </strong>
                                    <strong className="text-xl text-green-500">{result.remark}</strong>
                                </p>

                                <p>
                                    <strong>Completed: </strong>
                                    {result.completedDate}
                                </p>

                                <p>
                                    <strong> Time limit: </strong>
                                    {result.exam.timeLimit} minutes
                                </p>

                                <p className="mt-5 leading-6 tracking-tight whitespace-pre-line break-all" ><strong>Instructions</strong><br />
                                    <div
                                      dangerouslySetInnerHTML={{ __html: result.exam.desc }}
                                    />
                                </p>
                            </div>

                        </div>

                        <ReviewForm questions={sortedQuestions} result={result} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExamResult
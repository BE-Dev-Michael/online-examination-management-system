const Users = require('../models/users.model');
const Exams = require('../models/exams.model');
const Banks = require('../models/banks.model');
const Questions = require('../models/questions.model');

//* HTTP Method => GET
//* Route endpoint => /api/exams/all/:user
const getAllExams = async (req, res) => {
    try {
        // const examData = await Exams.find({})
        const examData = await Users.findById({_id: req.params.user}).populate('exam')
        res.send(examData.exam)
    } catch (error) {
        throw new Error(error)
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/exams/student
const getExamByCode = async (req, res) => {
    const { examCode, userId } = req.body

    //* Checks if may mag mamatch na exam code sa mga exams and if yung inaaccess na exam is not yet published
    try {
        const exam = await Exams.findOne({examCode: examCode})
        //* 1 = If there are no exam with the given exam code
        if(!exam) return res.send('1');
        //* 2 = If exam is not yet published
        if(exam.isPublished === false) return res.send('2');
    } catch (error) {
        console.error(error)
    }
    
    //* Pang check if naaccess na ni student yung exam via exam code
    const checkIfAlreadyAccessed = async () => {
        try {
            const examByCode = await Exams.findOne({examCode: examCode})
            const examId = String(examByCode._id)
            const examByStudent = await Users.findById({_id: userId})
            const result = examByStudent.studentExam.filter(data => String(data) === examId)
            
            if (result.length > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    //* If already accessed na ni student, then wag na isend yung exam data
    if (await checkIfAlreadyAccessed()) {
        //* 3 = You have already accessed this exam
        res.send('3')
    } else {
        try {
            const examByCode = await Exams.findOne({examCode: examCode}).populate('questions').populate('groups')
            await Users.findByIdAndUpdate(userId, {
                //* Push an object to array property in schema
                $push: {studentExam: examByCode._id}
            }, {
                //* Returns the object after successful update
                new: true
            })
            res.send(examByCode)
        } catch (error) {
            throw new Error(error)
        }
    }
}

//* HTTP Method => GET
//* Route endpoint => /api/exams/student/:user
const getExamByStudent = async (req, res) => {
    try {
        const examByStudent = await Users.findById({_id: req.params.user}).populate('studentExam').select('-password -exam -bank')
        const examIds = examByStudent.studentExam.map(data => data._id)
        const examData = await Exams.find({_id: examIds}).populate('questions').populate('groups')
        res.send(examData)
    } catch (error) {
        throw new Error(error)
    }
}

//* HTTP Method => GET
//* Route endpoint => /api/exams/:id
const viewExam = async (req, res) => {
    try {
        const examData = await Exams.findById({_id: req.params.id}).populate('questions').populate('groups')
        res.send(examData)
    } catch (error) {
        throw new Error(error)
    }
}

//* Functions for pulling random questions from bank
const randomIndex = (questions) => {
    //* For example: if questions length === 12, then this function will return a single random value from 0-12
    return Math.floor(Math.random() * questions.length)
}
const randomizeQuestions = (questions, limit) => {
    const randQuestions = []
    const indexes = []
    let hasDuplicate = false
   
    for (let i = 0; i < limit; i++) {
        //* Do-while loop to determine if there is a duplicate index from questions array
        do {
            hasDuplicate = false
            //* Generated random index from questions array
            const index = randomIndex(questions)
            //* Push the generated random index if it doesn't exist on indexes array
            //* Repeat the generation of random index if it does already exist on indexes array
            !indexes.includes(index) ? indexes.push(index) : hasDuplicate = true
        } while (hasDuplicate);
        console.log(i)
        randQuestions.push(questions[indexes[i]])
    }
        
    return randQuestions
}

//* HTTP Method => GET
//* Route endpoint => /api/exams/pull/:id
const pullQuestionsFromBank = async (req, res) => {
    const { limit } = req.body
    console.log(limit)
    try {
        const bankData = await Banks.findById({_id: req.params.id}).populate('questions')
        if (limit > bankData.questions.length) {
            res.send('You have entered number of questions that exceeded the total number of questions from bank')
        } else {
            const randQuestions = randomizeQuestions(bankData.questions, limit)
            bankData.questions = randQuestions
            res.send(bankData)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
    console.log('GET one bank')
}

//* HTTP Method => POST
//* Route endpoint => /api/exams/question/:id
const addQuestion = async (req, res) => {
    const id = req.params.id
    // const { question, choices, answer, points } = req.body
    
    try {
        const questionData = await Questions.create({
            question: 'Sample question',
            choices: ['a', 'b', 'c', 'd'],
            answer: 'b',
            points: 1
        })
        const questionByExam = await Exams.findByIdAndUpdate(id, {
            //* Push an object to array property in schema
            $push: {questions: questionData._id}
        }, {
            //* Returns the object after successful update
            new: true
        })
        // const deleteObj = await Exams.updateOne({
        //     title: 'English Grammar'
        // }, {
        //     $unset: {
        //         questions: ''
        //     }
        // })
        
        res.send(questionData)
        
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/exams/group/:id
const addQuestionGroup = async (req, res) => {
    const id = req.params.id
    // const { question, choices, answer, points } = req.body
    const questionIds = 
    ["627107367a0ba49f45c404a0",
    "62710fb84f85eb437b38770f",
    "627111b74f85eb437b387734"]
    try {
        const groupByExam = await Exams.findByIdAndUpdate(id, {
            //* Push an object to array property in schema
            $push: {groups: questionIds}
        }, {
            //* Returns the object after successful update
            new: true
        })
        // const deleteObj = await Exams.updateOne({
        //     title: 'English Grammar'
        // }, {
        //     $unset: {
        //         questions: ''
        //     }
        // })
        
        res.send(groupByExam)
        
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/exams
const addExam = async (req, res) => {
    const { title, desc, timeLimit, startDate, endDate, examCode, questions, groups, isPublished, user } = req.body
    try {
        const examData = await Exams.create({
            title: title,
            desc: desc,
            timeLimit: timeLimit,
            startDate: startDate,
            endDate: endDate,
            examCode: examCode,
            questions: questions,
            groups: groups,
            isPublished: isPublished
        })
        await Users.findByIdAndUpdate(user, {
            //* Push an object to array property in schema
            $push: {exam: examData._id}
        }, {
            //* Returns the object after successful update
            new: true
        })
        
        res.send(examData)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
    
}
//* HTTP Method => PATCH
//* Route endpoint => /api/exams/publish/:id
const publishExam = async (req, res) => {
    const { isPublished } = req.body
    try {
        const newData = await Exams.findByIdAndUpdate(req.params.id, { isPublished: isPublished })
        res.status(200).send('Published!')
    } catch (error) {
        console.error(error)
        res.status(500)
    }
}

//* HTTP Method => PATCH
//* Route endpoint => /api/exams/:id
const updateExam = async (req, res) => {
    const { title } = req.body
   
    try {
        const newData = await Exams.findByIdAndUpdate(req.params.id, { examCode: 'sampleExamCode' })
        res.status(200).send(await Exams.findById(newData.examCode))
    } catch (error) {
        console.error(error)
        res.status(500)
    }
    
}

//* HTTP Method => DELETE
//* Route endpoint => /api/exams/:id
const deleteExam = (req, res) => {
    console.log('DELETE')
    res.send('DELETE')
}

module.exports = { 
    getAllExams,
    getExamByCode,
    getExamByStudent, 
    viewExam,
    pullQuestionsFromBank, 
    addQuestion, 
    addQuestionGroup, 
    addExam, 
    publishExam,
    updateExam, 
    deleteExam 
}
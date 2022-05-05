const Exams = require('../models/exams.model');
const Banks = require('../models/banks.model');
const Questions = require('../models/questions.model');

//* HTTP Method => GET
//* Route endpoint => /api/exams
const getAllExams = async (req, res) => {
    try {
        const examData = await Exams.find({})
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

//* HTTP Method => GET
//* Route endpoint => /api/exams/pull/:id
const pullQuestionsFromBank = async (req, res) => {
    const limit = 3
    const randomIndex = (questions) => {
        return Math.floor(Math.random() * questions.length)
    }
    try {
        const bankData = await Banks.findById({_id: req.params.id}).populate('questions')
        const questions = bankData.questions
        const randQuestions = []
        const indexes = []
        let hasDuplicate = false
        console.log(questions.length)
        for (let i = 0; i < limit; i++) {
            do {
                hasDuplicate = false
                const index = randomIndex(questions)
                !indexes.includes(index) ? indexes.push(index) : hasDuplicate = true
            } while (hasDuplicate);
            randQuestions.push(questions[indexes[i]])
        }
        const questionIds = randQuestions.map(question => question._id)
        res.send(questionIds)
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
    // const { title } = req.body
    try {
        const examData = await Exams.create({
            title: 'Sample exam2',
            desc: 'Sample desc2',
            timeLimit: 120,
            startDate: '05/09/22',
            endDate: '05/11/22',
            examCode: 'sampleExamCode2'
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
    viewExam,
    pullQuestionsFromBank, 
    addQuestion, 
    addQuestionGroup, 
    addExam, 
    publishExam,
    updateExam, 
    deleteExam 
}
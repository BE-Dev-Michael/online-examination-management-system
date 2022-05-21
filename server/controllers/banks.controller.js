const Users = require('../models/users.model');
const Banks = require('../models/banks.model');
const Questions = require('../models/questions.model');

//* HTTP Method => GET
//* Route endpoint => /api/banks/all/:user
const getAllQuestionBanks = async (req, res) => {
    try {
        // const banksData = await Banks.find({})
        const bankData = await Users.findById({_id: req.params.user}).populate('bank')
        res.send(bankData.bank)
    } catch (error) {
        console.error(error)
        res.send([])
    }
}

//* HTTP Method => GET
//* Route endpoint => /api/banks/:id
const getQuestions = async (req, res) => {
    try {
        const bankData = await Banks.findById({_id: req.params.id}).populate('questions')
        console.log('getQuestions')
        res.send(bankData)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
    console.log('GET one bank')
    
}

//* HTTP Method => POST
//* Route endpoint => /api/banks/question/:id
const addQuestion = async (req, res) => {
    const id = req.params.id
    const { question, choices, answer, points, kd, cpd } = req.body
    
    try {
        const questionData = await Questions.create({
            question: question,
            choices: choices,
            answer: answer,
            points: points,
            kd: kd,
            cpd: cpd
        })
        const questionByBank = await Banks.findByIdAndUpdate(id, {
            //* Push an object to array property in schema
            $push: {questions: questionData._id}
        }, {
            //* Returns the object after successful update
            new: true
        })
        // const deleteObj = await Banks.updateOne({
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

//* HTTP Method => GET
//* Route endpoint => /api/banks/question/:id
const getQuestion = async (req, res) => {
    try {
        const questionData = await Questions.findById({ _id: req.params.id })
        res.status(200).send(questionData)
    } catch (error) {
        console.error(error)
        res.status(500)
    }
}

//* HTTP Method => PATCH
//* Route endpoint => /api/banks/question/:id
const updateQuestion = async (req, res) => {
    const { questionData } = req.body
   
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(req.params.id, questionData)
        res.status(200).send(await Questions.findById(updatedQuestion._id))
    } catch (error) {
        console.error(error)
        res.status(500)
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/banks
const addQuestionBank = async (req, res) => {
    const { title, user } = req.body
    try {
        const bankData = await Banks.create({
            title: title
        })
        await Users.findByIdAndUpdate(user, {
            //* Push an object to array property in schema
            $push: {bank: bankData._id}
        }, {
            //* Returns the object after successful update
            new: true
        })
        res.send(bankData)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
    
}

//* HTTP Method => PATCH
//* Route endpoint => /api/banks/:id
const updateQuestionBank = async (req, res) => {
    const { title } = req.body
   
    try {
        const newTitle = await Banks.findByIdAndUpdate(req.params.id, { title: title })
        res.status(200).send(await Banks.findById(newTitle._id))
    } catch (error) {
        console.error(error)
        res.status(500)
    }
    
}

//* HTTP Method => DELETE
//* Route endpoint => /api/banks/:id
const deleteQuestionBank = (req, res) => {
    console.log('DELETE')
    res.send('DELETE')
}

module.exports = { 
    getAllQuestionBanks, 
    getQuestions, 
    addQuestion,
    getQuestion, 
    updateQuestion, 
    addQuestionBank, 
    updateQuestionBank, 
    deleteQuestionBank 
}
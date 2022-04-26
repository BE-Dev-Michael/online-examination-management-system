const Banks = require('../models/banks.model');
//* HTTP Method => GET
//* Route endpoint => /api/banks
const getAllQuestionBanks = async (req, res) => {
    try {
        const bankData = await Banks.find({})
        // console.log(bankData)
        res.send(bankData)
    } catch (error) {
        throw new Error(error)
    }
}

//* HTTP Method => GET
//* Route endpoint => /api/banks/:id
const getQuestionBank = async (req, res) => {
    try {
        const bankData = await Banks.findById({_id: req.params.id})
        // console.log(bankData)
        res.send(bankData)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
    console.log('GET one bank')
    
}

//* HTTP Method => POST
//* Route endpoint => /api/banks
const addQuestionBank = async (req, res) => {
    const { title } = req.body
    try {
        const bankData = await Banks.create({
            title: title
        })
        console.log(bankData)
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
    // console.log(title)
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

module.exports = { getAllQuestionBanks, getQuestionBank, addQuestionBank, updateQuestionBank, deleteQuestionBank }
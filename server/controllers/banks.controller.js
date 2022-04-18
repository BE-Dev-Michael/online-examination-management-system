
//* HTTP Method => GET
//* Route endpoint => /api/banks
const getAllQuestionBanks = (req, res) => {
    console.log('GET')
    res.send('GET')
}

//* HTTP Method => POST
//* Route endpoint => /api/banks
const addQuestionBank = (req, res) => {
    console.log('POST')
    res.send('POST')
}

//* HTTP Method => PUT
//* Route endpoint => /api/banks/:id
const updateQuestionBank = (req, res) => {
    console.log('PUT')
    res.send('PUT')
}

//* HTTP Method => DELETE
//* Route endpoint => /api/banks/:id
const deleteQuestionBank = (req, res) => {
    console.log('DELETE')
    res.send('DELETE')
}

module.exports = { getAllQuestionBanks, addQuestionBank, updateQuestionBank, deleteQuestionBank }
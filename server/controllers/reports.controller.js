const Users = require('../models/users.model');
const Exams = require('../models/exams.model');

//* HTTP Method => GET
//* Route endpoint => /api/reports/:user
const getExamAndQuestions = async (req, res) => {
    try {
        // const examData = await Exams.find({}).populate('questions').populate('groups')
        const examByUser = await Users.findById({_id: req.params.user}).populate('exam')
        const examIds = examByUser.exam.map(data => data._id)
        const examData = await Exams.find({_id: examIds}).populate('questions').populate('groups')
        res.send(examData)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getExamAndQuestions }
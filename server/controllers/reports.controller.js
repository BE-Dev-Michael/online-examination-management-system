const Exams = require('../models/exams.model');

const getExamAndQuestions = async (req, res) => {
    try {
        const examData = await Exams.find({}).populate('questions').populate('groups')
        res.send(examData)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getExamAndQuestions }
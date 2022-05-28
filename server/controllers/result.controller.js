const Users = require('../models/users.model');
const Exams = require('../models/exams.model');
const Result = require('../models/result.model');

//* HTTP Method => GET
//* Route endpoint => /api/result/all/:user
const getAllExamResult = async (req, res) => {
    try {
        //* Get exam result by user with nested joins/populate
        const resultByUser = await Users.findById({_id: req.params.user}).
        populate({ path: 'result', populate: { path: 'exam', populate: { path: 'questions groups' } } })
        res.send(resultByUser.result)
    } catch (error) {
        throw new Error(error)
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/result
const setExamResult = async (req, res) => {
    const { score, remark, percentage, timeSpent, completedDate, answers, correctAnswers, examId, userId } = req.body

    try {
        const resultData = await Result.create({
            score: score,
            remark: remark,
            percentage: percentage,
            timeSpent: timeSpent,
            completedDate: completedDate,
            answers: answers,
            correctAnswers: correctAnswers,
            exam: examId,
            student: userId
        })
        await Users.findByIdAndUpdate(userId, {
            //* Push an object to array property in schema
            $push: {result: resultData._id}
        }, {
            //* Returns the object after successful update
            new: true
        })
        res.send(resultData)
    } catch (error) {
        console.error(error);
    }
}

//* HTTP Method => GET
//* Route endpoint => /api/result/:id
const viewExamResult = async (req, res) => {
    try {
        const examData = await Result.findById({_id: req.params.id}).populate('exam')
        res.send(examData)
    } catch (error) {
        console.error(error)
    }
}

//* HTTP Method => GET
//* Route endpoint => /api/result/exam/:id
const getStudentResultByExam = async (req, res) => {
    const examId = req.params.id
    try {
        const studentData = await Result.find({ exam: examId }).populate('student').populate({ path: 'exam', populate: { path: 'questions groups' } })
        res.send(studentData)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getAllExamResult, setExamResult, viewExamResult, getStudentResultByExam }
const express = require('express');
const router = express.Router();
const { getAllExams, 
        getExamByCode,
        getExamByStudent,
        viewExam, 
        pullQuestionsFromBank, 
        addQuestion, 
        getQuestionGroups,
        addQuestionGroup,
        overwriteQuestionGroup, 
        updateQuestionGroup,
        addExam, 
        publishExam, 
        updateExam, 
        deleteExam } = require('../../controllers/exams.controller')

router.get('/all/:user', getAllExams)
router.post('/student', getExamByCode)
router.get('/student/:user', getExamByStudent)
router.get('/:id', viewExam)
router.post('/pull/:id', pullQuestionsFromBank)
router.post('/question/:id', addQuestion)
router.post('/group', getQuestionGroups)
router.post('/group/add', addQuestionGroup)
router.post('/group/:id', overwriteQuestionGroup)
router.patch('/group/:id', updateQuestionGroup)
router.post('/', addExam)
router.patch('/publish/:id', publishExam)
router.patch('/:id', updateExam)
router.delete('/:id', deleteExam)

module.exports = router
const express = require('express');
const router = express.Router();
const { getAllExams, viewExam, pullQuestionsFromBank, addQuestion, addQuestionGroup, addExam, updateExam, deleteExam} = require('../../controllers/exams.controller')

router.get('/', getAllExams)
router.get('/:id', viewExam)
router.get('/pull/:id', pullQuestionsFromBank)
router.post('/question/:id', addQuestion)
router.post('/group/:id', addQuestionGroup)
router.post('/', addExam)
router.patch('/:id', updateExam)
router.delete('/:id', deleteExam)

module.exports = router
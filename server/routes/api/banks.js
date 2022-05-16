const express = require('express');
const router = express.Router();
const { getAllQuestionBanks, getQuestions, addQuestion, updateQuestion, addQuestionBank, updateQuestionBank, deleteQuestionBank} = require('../../controllers/banks.controller')

router.get('/all/:user', getAllQuestionBanks)
router.get('/:id', getQuestions)
router.post('/question/:id', addQuestion)
router.patch('/question/:id', updateQuestion)
router.post('/', addQuestionBank)
router.patch('/:id', updateQuestionBank)
router.delete('/:id', deleteQuestionBank)

module.exports = router
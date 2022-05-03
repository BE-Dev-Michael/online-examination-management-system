const express = require('express');
const router = express.Router();
const { getAllQuestionBanks, getQuestions, addQuestion, addQuestionBank, updateQuestionBank, deleteQuestionBank} = require('../../controllers/banks.controller')

router.get('/', getAllQuestionBanks)
router.get('/:id', getQuestions)
router.post('/question/:id', addQuestion)
router.post('/', addQuestionBank)
router.patch('/:id', updateQuestionBank)
router.delete('/:id', deleteQuestionBank)

module.exports = router
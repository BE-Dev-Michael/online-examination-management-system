const express = require('express');
const router = express.Router();
const { getAllQuestionBanks, getQuestionBank, addQuestionBank, updateQuestionBank, deleteQuestionBank} = require('../../controllers/banks.controller')

router.get('/', getAllQuestionBanks)
router.get('/:id', getQuestionBank)
router.post('/', addQuestionBank)
router.patch('/:id', updateQuestionBank)
router.delete('/:id', deleteQuestionBank)

module.exports = router
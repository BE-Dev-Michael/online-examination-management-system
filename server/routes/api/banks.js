const express = require('express');
const router = express.Router();
const { getAllQuestionBanks, addQuestionBank, updateQuestionBank, deleteQuestionBank} = require('../../controllers/banks.controller')

router.get('/', getAllQuestionBanks)
router.post('/', addQuestionBank)
router.put('/:id', updateQuestionBank)
router.delete('/:id', deleteQuestionBank)

module.exports = router
const express = require('express');
const router = express.Router();
const { getExamAndQuestions } = require('../../controllers/reports.controller')

router.get('/:user', getExamAndQuestions)

module.exports = router
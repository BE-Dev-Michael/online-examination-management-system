const express = require('express');
const router = express.Router();
const { getExamAndQuestions } = require('../../controllers/reports.controller')

router.get('/', getExamAndQuestions)

module.exports = router
const express = require('express');
const router = express.Router();
const { getAllExamResult, setExamResult, viewExamResult, getStudentResultByExam } = require('../../controllers/result.controller')

router.get('/all/:user', getAllExamResult)
router.post('/', setExamResult)
router.get('/:id', viewExamResult)
router.get('/exam/:id', getStudentResultByExam)

module.exports = router
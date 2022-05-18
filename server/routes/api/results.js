const express = require('express');
const router = express.Router();
const { getAllExamResult, setExamResult, viewExamResult } = require('../../controllers/result.controller')

router.get('/all/:user', getAllExamResult)
router.post('/', setExamResult)
router.post('/:id', viewExamResult)

module.exports = router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET')
    res.send('GET')
})
router.post('/', (req, res) => {
    console.log('POST')
    res.send('POST')
})
router.put('/:id', (req, res) => {
    console.log('PUT')
    res.send('PUT')
})
router.delete('/:id', (req, res) => {
    console.log('DELETE')
    res.send('DELETE')
})

module.exports = router
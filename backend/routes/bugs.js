const express = require('express')
const router = express.Router()
const { getAllBugs, createBug, updateBug, deleteBug } = require('../controllers/bugs')

router.get('/:id', getAllBugs)
router.post('/:id', createBug)
router.put('/:id', updateBug)
router.delete('/:id', deleteBug)

module.exports = router
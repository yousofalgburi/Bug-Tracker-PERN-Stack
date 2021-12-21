const express = require('express')
const router = express.Router()
const { createTeam, joinTeam, leaveTeam } = require('../controllers/teams')

router.post('/createTeam', createTeam)
router.post('/joinTeam', joinTeam)
router.post('/leaveTeam', leaveTeam)

module.exports = router
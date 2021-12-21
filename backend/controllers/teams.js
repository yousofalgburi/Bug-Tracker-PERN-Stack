const db = require('../db/db')

module.exports.createTeam = async (req, res) => {
    const { memberName, teamName } = req.body
    
    try {
        const random = `Team${randomDigits()}`
        await db.query('INSERT INTO teams (teamName, teamCode, teamCount) values ($1, $2, $3);', [teamName, random, 1])
        await db.query('INSERT INTO members (teamcode, memberName) values ($1, $2);', [random, memberName])
        res.status(200).json({ memberName, teamName, teamCode: random })
    } catch (error) {
        res.status(400)
        console.log(error)
    }
}

module.exports.joinTeam = async (req, res) => {
    const { teamCode, memberName } = req.body

    try {
        const teamdb = await db.query('select from teams where teamcode = $1;', [teamCode])
        if(teamdb.rowCount > 0) {
            await db.query('INSERT INTO members (teamcode, memberName) values ($1, $2);', [teamCode, memberName])
            await db.query('UPDATE teams SET teamCount = teamCount + 1 WHERE teamCode = $1;', [teamCode])
            res.status(200).json({ teamCode, memberName })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.leaveTeam = async (req, res) => {
    const { teamCode, memberName } = req.body
    try {
        await db.query('DELETE FROM members WHERE membername = $1', [memberName])
        await db.query('UPDATE teams SET teamCount = teamCount - 1 WHERE teamCode = $1;', [teamCode])
        const result = await db.query('select from teams where teamcount = $1;', [0])
        if(result.rowCount === 1 ) await db.query('DELETE FROM bugs WHERE teamcode = $1;', [teamCode])
        await db.query('DELETE FROM teams WHERE teamCount = $1;', [0])
        res.status(200).json({ teamCode, memberName })
    } catch (error) {
        res.status(400)
        console.log(error)
    }
}

const randomDigits = () => {
    return Math.floor(Math.random()*90000) + 10000;
}
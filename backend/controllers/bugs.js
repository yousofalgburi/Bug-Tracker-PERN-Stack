const db = require('../db/db')

module.exports.getAllBugs = async (req, res) => {
    const { id } = req.params
    try {
        const teamdb = await db.query('select * from bugs where teamcode = $1', [id])
        const membersdb = await db.query('select * from members where teamcode = $1', [id])
        res.status(200).json({ bugs: teamdb.rows, members: membersdb.rows })
    } catch (error) {
        console.log(error)
    }
}

module.exports.createBug = async (req, res) => {
    const { id } = req.params
    const { errorMessage, errorCode, Date, memberName, resolved } = req.body

    try {
        const bugsdb = await db.query('INSERT INTO bugs (teamcode, errorcode, errormessage, creationdate, createdby, resolved) VALUES ($1, $2, $3, $4, $5, $6) returning *;', [id, errorCode, errorMessage, Date, memberName, resolved])
        res.status(200).json({ data: bugsdb.rows[0] })
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateBug = async (req, res) => {
    const { id } = req.params
    const { errormessage, errorcode, date, createdby, resolved } = req.body

    try {
        const bugsdb = await db.query('UPDATE bugs SET errorcode = $1, errormessage = $2, creationdate = $3, createdby = $4, resolved = $5 WHERE id = $6 returning *;'
        , [errorcode, errormessage, date, createdby, resolved, id])
        res.status(200).json({ data: bugsdb.rows[0] })
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteBug = async (req, res) => {
    const { id } = req.params
    try {
        const bugsdb = await db.query('DELETE FROM bugs WHERE id = $1', [id])
        res.status(200).json({bugsdb})
    } catch (error) {
        console.log(error)
    }
}
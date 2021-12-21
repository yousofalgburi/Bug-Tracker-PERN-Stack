import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../api/api'
import { BugsContext } from '../../context/BugsContext'
import moment from 'moment'

const BugContent = (props) => {
    const history = useHistory()
    const { bugs, setBugs, addBug, members, setMembers, resolveBug, resolvedBugs, setResolvedBugs } = useContext(BugsContext)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [errorCode, setErrorCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/${user?.teamCode}`)
                const notResolved = response.data.bugs.filter((bugs) => bugs.resolved === false)
                const resolved = response.data.bugs.filter((bugs) => bugs.resolved === true)
                setBugs(notResolved)
                setResolvedBugs(resolved)
                setMembers(response.data.members)
                history.push('/')
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleLogout = async () => {
        await api.post('/auth/leaveTeam', { teamCode: user?.teamCode, memberName: user?.memberName})
        localStorage.removeItem('profile')
        history.push('/auth')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await api.post(`/${user?.teamCode}`, { errorCode, errorMessage, Date: new Date().toISOString(), memberName: user?.memberName, resolved: false })
        addBug(result.data.data)
        clear()
    }

    const handleBugClick = async (e, id) => {
        e.stopPropagation()
        history.push(`/${id}`)
    }

    const handleResolve = async (e, bug) => {
        e.stopPropagation()
        await api.put(`${bug.id}`, { errorcode: bug.errorcode, errormessage: bug.errormessage, createdby: bug.createdby, date: bug.creationdate, resolved: true })
        resolveBug(bug)
    }

    const clear = () => {
        setErrorCode('')
        setErrorMessage('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center align-items-center mb-5'>
                    <div className='col-4'>
                        <label htmlFor="errorCode" className="form-label">Error Code</label>
                        <input value={errorCode} onChange={(e) => setErrorCode(e.target.value)} type="text" className="form-control" id="errorCode" aria-describedby="errorCode" minLength={3} maxLength={10} required/>
                    </div>
                    <div className='col-8 m-1'>
                        <label htmlFor="errorMessage" className="form-label">Error Message</label>
                        <textarea value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} type="text" className="form-control" id="errorMessage" aria-describedby="errorMessage" minLength={1} maxLength={500} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

            <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Awaiting Action</button>
                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Resolved</button>
                    <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Team Members</button>
                    <button className='btn btn-danger mt-5' onClick={handleLogout}>Logout</button>
                    <p>Logged in as {user?.memberName}</p>
                    <p>Code: {user?.teamCode}</p>
                </div>
                <div className="tab-content container" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Error Code</th>
                                <th scope="col">Error Message</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created Time</th>
                                <th scope="col">Resolve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bugs && bugs.map((bug) => {
                                    return (
                                        <tr key={bug.id} onClick={(e) => handleBugClick(e, bug.id)}>
                                            <th scope="row">{bug.errorcode}</th>
                                            <td style={{maxWidth: '50em', overflowWrap: 'break-word'}}>{bug.errormessage}</td>
                                            <td>{bug.createdby}</td>
                                            <td>{moment(bug.creationdate).fromNow()}</td>
                                            <td><button onClick={(e) => handleResolve(e, bug)} className='btn btn-success'>Resolve</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Error Code</th>
                                <th scope="col">Error Message</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resolvedBugs && resolvedBugs.map((bug) => {
                                    return (
                                        <tr className="table-success" key={bug.id}>
                                            <th scope="row">{bug.errorcode}</th>
                                            <td>{bug.errormessage}</td>
                                            <td>{bug.createdby}</td>
                                            <td>{moment(bug.creationdate).fromNow()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                            <div className='text-center'>
                                <h3>Team Members</h3>
                                <ul className="list-group">
                                    {members.map((member) => {
                                        return (
                                            <li className='list-group-item' key={member.id}>{member.membername}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BugContent
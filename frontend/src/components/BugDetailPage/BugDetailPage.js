import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { BugsContext } from '../../context/BugsContext'
import moment from 'moment'
import api from '../../api/api'

const BugDetailPage = (props) => {
    const { bugs, removeBug } = useContext(BugsContext)
    const bug = bugs.find((id) => id === id)
    const { id } = useParams()
    const [errorCode, setErrorCode] = useState(bug?.errorcode)
    const [errorMessage, setErrorMessage] = useState(bug?.errormessage)
    const history = useHistory()

    const deleteBug = async () => {
        await api.delete(`/${bug.id}`)
        removeBug(bug)
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await api.put(`${bug.id}`, { errorcode: errorCode, errormessage: errorMessage, createdby: bug.createdby, date: bug.creationdate, resolved: false })
        history.push('/')
    }


    return (
        <div className='card mx-auto mt-5' style={{width: '50%'}}>
            {bug ? ( <>
                <form className='card-body' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='errorcode' className='form-label'>Error Code</label>
                        <input type="text" className="form-control" id="errorcode" aria-describedby="errorCode" value={errorCode} onChange={(e) => setErrorCode(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='errormessage' className='form-label'>Error Message</label>
                        <input type="text" className="form-control" id="errormessage" aria-describedby="errormessage" value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} />
                    </div>
                    <p className='text-muted'>Created By: {bug.createdby}</p>
                    <p className='text-muted'>Creation Time: {moment(bug.creationdate).fromNow()}</p>
                    <button className='btn btn-primary' type='submit'>Submit Changes & Go Back</button>
                </form>
                <div className='d-flex justify-content-end'>
                    <button style={{width: '120px', height: '40px', margin: '5px'}} className='btn btn-danger' onClick={deleteBug}>Delete Bug</button>
                </div>
                </>    
                    ) : 
            <h1>not found</h1> }
        </div>
    )
}

export default BugDetailPage
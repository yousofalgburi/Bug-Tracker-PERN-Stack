import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../api/api'

const Auth = () => {
    const [teamName, setTeamName] = useState('')
    const [memberName, setMemberName] = useState('')
    const [teamCode, setTeamCode] = useState('')
    const [createTeam, setCreateTeam] = useState(false)
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(createTeam) {
            const response = await api.post('/auth/createTeam', { memberName, teamName })
            localStorage.setItem('profile', JSON.stringify({ ...response?.data }))
            clear()
            history.push('/')
        } else {
            const response = await api.post('/auth/joinTeam', { memberName, teamCode })
            localStorage.setItem('profile', JSON.stringify({ ...response?.data }))
            clear()
            history.push('/')
        }
    }

    const handleSwitch = (e) => {
        e.preventDefault()
        setCreateTeam(!createTeam)
    }

    const clear = () => {
        setTeamName('')
        setTeamCode('')
        setMemberName('')
    }

    return (
        <div className='container d-flex justify-content-center align-items-center mt-5'>
            <div className='row'>
                <div className='card shadow'>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>{createTeam ? 'Create New Team' : 'Join Team'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor='memberName'>Member Name</label>
                                <input onChange={(e) => setMemberName(e.target.value)} value={memberName} className='form-control' type='text' id='memberName' name='memberName' maxLength={20} required/>
                            </div>
                            {createTeam ?
                            <>
                                <div className='mb-3'>
                                    <label className='form-label' htmlFor='teamName'>Team Name</label>
                                    <input onChange={(e) => setTeamName(e.target.value)} value={teamName} className='form-control' type='text' id='teamName' name='teamName' />
                                </div>
                            </>
                            :
                                <div className='mb-3'>
                                    <label className='form-label' htmlFor='teamCode'>Team Code</label>
                                    <input onChange={(e) => setTeamCode(e.target.value)} value={teamCode} className='form-control' type='teamcode' id='teamCode' name='teamCode' />
                                </div>
                            }

                            <div className="d-grid gap-2">
                                <button type='submit' className="btn btn-primary">{createTeam ? 'Create New Team' : 'Join Team'}</button>
                                <button onClick={handleSwitch} className='btn btn-secondary'>{createTeam ? 'Join a team instead' : 'Make a team instead'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Auth
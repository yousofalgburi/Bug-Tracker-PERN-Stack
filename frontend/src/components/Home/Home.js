import BugContent from '../BugContent/BugContent'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const hisotry = useHistory()

    if(!user) {
        hisotry.push('/auth')
        return null
    }
    
    return (
        <div className='container mt-5'>
            <BugContent />
        </div>
    )
}

export default Home
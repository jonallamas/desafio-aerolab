import { 
    createContext, 
    useEffect, 
    useState 
} from "react"

import API from '../api/axios'
import Loading from '../../components/loading'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState({})
    const [ status, setStatus ] = useState('pending')
    const [ purchaseStatus, setPurchaseStatus ] = useState('ready')

    useEffect(() => {
        API.get('/user/me').then(res => {
            setUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    if( !user || status === 'pending') {
        return (
            <Loading onChange={ setStatus } />
        )
    }

    return(
        <UserContext.Provider value={{
            user,
            purchaseStatus,
            setUser,
            setPurchaseStatus
        }}>
            { children }
        </UserContext.Provider>
    )
}
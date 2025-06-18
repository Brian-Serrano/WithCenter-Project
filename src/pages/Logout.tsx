import { useNavigate } from 'react-router-dom'
import '../css/Logout.css'
import NavigationBar from './NavigationBar'
import supabase from '../client/supabase-client'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import { changeError } from '../state/logout-slice'

function Logout() {
    const logoutState = useSelector((state: RootState) => state.logoutState)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()

    const onLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            return dispatch(changeError(error.message))
        }
        else {
            localStorage.removeItem("user_id")
            return onNavigate("/login")
        }
    }

    return (
        <div>
            <NavigationBar />
            <div className="container">
                <div className="text">Are you sure you want to logout?</div>
                <button className="button" type="button" onClick={onLogout}>Yes</button>
                <p style={{color: "red"}}>{logoutState.error}</p>
            </div>
        </div>
    )
}

export default Logout
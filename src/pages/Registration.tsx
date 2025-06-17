import { useDispatch, useSelector } from 'react-redux'
import './Login.css'
import type { AppDispatch, RootState } from '../state/store'
import { changeUsername, changePassword, changeEmail, changeAge, changeLocation } from '../state/register-slice'
import supabase from '../client/supabase-client'
import { useNavigate } from 'react-router-dom'
import { changeError } from '../state/login-slice'

function Registration() {
    const registerState = useSelector((state: RootState) => state.registerState)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()

    const register = async () => {
        const result = {
            username: registerState.username,
            password: registerState.password,
            email: registerState.email,
            age: registerState.age,
            location: registerState.location
        }

        const { data, error } = await supabase.from("User").insert(result).single()

        if (error) {
            changeError(error.details)
        }
        else {
            onNavigate("/")
        }
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={registerState.username}
                    onChange={(event) => dispatch(changeUsername(event.target.value))} />
                <input
                    type="password"
                    placeholder="Password"
                    value={registerState.password}
                    onChange={(event) => dispatch(changePassword(event.target.value))} />
                <input
                    type="email"
                    placeholder="Email"
                    value={registerState.email}
                    onChange={(event) => dispatch(changeEmail(event.target.value))} />
                <input
                    type="number"
                    placeholder="Age"
                    value={registerState.age}
                    onChange={(event) => dispatch(changeAge(parseInt(event.target.value)))} />
                <input
                    type="text"
                    placeholder="Location"
                    value={registerState.location}
                    onChange={(event) => dispatch(changeLocation(event.target.value))} />
                <button type="button" onClick={register}>Register</button>
                <p style={{color: "red"}}>{registerState.error}</p>
            </form>
        </div>
    )
}

export default Registration
import { useDispatch, useSelector } from 'react-redux'
//import '../css/Login.css'
import type { AppDispatch, RootState } from '../state/store'
import { changeUsername, changePassword, changeEmail, changeAge, changeLocation, changeError } from '../state/register-slice'
import supabase from '../client/supabase-client'
import { useNavigate } from 'react-router-dom'

function Registration() {
    const registerState = useSelector((state: RootState) => state.registerState)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()

    const register = async () => {
        if (!registerState.username || !registerState.password || !registerState.email || !registerState.age || !registerState.location) {
            return dispatch(changeError("Please fill up all empty fields"))
        }
        if (registerState.username.length < 8 || registerState.username.length > 20) {
            return dispatch(changeError("Username should be 8-20 characters"))
        }
        if (registerState.password.length < 8 || registerState.password.length > 20) {
            return dispatch(changeError("Password should be 8-20 characters"))
        }
        if (registerState.email.length < 15 || registerState.email.length > 40) {
            return dispatch(changeError("Email should be 15-40 characters"))
        }
        if (registerState.age < 8 || registerState.age > 60) {
            return dispatch(changeError("Age should be 8-60"))
        }
        if (registerState.location.length < 20 || registerState.location.length > 60) {
            return dispatch(changeError("Location should be 20-60 characters"))
        }

        const { data, error } = await supabase.auth.signUp({
            email: registerState.email,
            password: registerState.password,
        });

        if (error) {
            return dispatch(changeError(error.message))
        }

        const userId = data.user?.id

        const result = await supabase.from("User").insert({
            username: registerState.username,
            age: registerState.age,
            location: registerState.location,
            user_id: userId
        }).single()

        if (result.error) {
            return dispatch(changeError(result.error?.message))
        }
        else {
            localStorage.setItem("user_id", userId!)
            return onNavigate("/")
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
                <p onClick={() => onNavigate("/login")}>Already have an account? Log in.</p>
                <p style={{color: "red"}}>{registerState.error}</p>
            </form>
        </div>
    )
}

export default Registration
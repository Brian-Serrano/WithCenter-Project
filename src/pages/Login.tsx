import { useDispatch, useSelector } from 'react-redux'
import './Login.css'
import type { AppDispatch, RootState } from '../state/store'
import { changeUsername, changePassword } from '../state/login-slice'

function Login() {
    const loginState = useSelector((state: RootState) => state.loginState)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={loginState.username}
                    onChange={(event) => dispatch(changeUsername(event.target.value))} />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginState.password}
                    onChange={(event) => dispatch(changePassword(event.target.value))} />
                <button type="submit">Login</button>
                <p style={{color: "red"}}>{loginState.error}</p>
            </form>
        </div>
    )
}

export default Login
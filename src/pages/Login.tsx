import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/Login.module.css'
import type { AppDispatch, RootState } from '../state/store'
import { changeEmail, changePassword, changeError } from '../state/login-slice'
import { useNavigate } from 'react-router-dom'
import supabase from '../client/supabase-client'

function Login() {
    const loginState = useSelector((state: RootState) => state.loginState)
    const dispatch = useDispatch<AppDispatch>()
    const onNavigate = useNavigate()

    const login = async () => {
        if (!loginState.email || !loginState.password) {
            return dispatch(changeError("Please fill up all empty fields"))
        }
        if (loginState.email.length < 15 || loginState.email.length > 40) {
            return dispatch(changeError("Email should be 8-20 characters"))
        }
        if (loginState.password.length < 8 || loginState.password.length > 20) {
            return dispatch(changeError("Password should be 8-20 characters"))
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginState.email,
            password: loginState.password,
        });

        if (error) {
            return dispatch(changeError(error.message))
        }
        else {
            localStorage.setItem("user_id", data.user?.id)
            return onNavigate("/")
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.login_container}>
                <form className={styles.login_form}>
                    <h2 className={styles.h2}>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={loginState.email}
                        onChange={(event) => dispatch(changeEmail(event.target.value))} />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={loginState.password}
                        onChange={(event) => dispatch(changePassword(event.target.value))} />
                    <button type="button" className={styles.button} onClick={login}>Login</button>
                    <p style={{color: "blue"}} onClick={() => onNavigate("/register")}>Don't have an account yet? Register.</p>
                    <p style={{color: "red"}}>{loginState.error}</p>
                </form>
            </div>
        </div>
    )
}

export default Login
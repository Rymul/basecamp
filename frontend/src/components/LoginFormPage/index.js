import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to='/' />;

    const handleChange = (e) => {
        if (e.target.id) {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleDemoClick = (e) => {
        e.preventDefault();
        setEmail('demo@user.com')
        setPassword('password')
        return dispatch(sessionActions.login({email, password}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({email, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.close().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });

    }

    return (
        <div className="login-component">  
            <form className="login-form" onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <div className="title">
                    <h1>Welcome Back!</h1>
                    <p>Let's get you outside.</p>
                </div>
                <div className="login-container">
                    <input 
                        className="session-form-control"
                        id='email' 
                        type="text"
                        placeholder="Email address..."
                        value={email}
                        onChange={handleChange}
                    />
                    <input 
                        className="session-form-control"
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={handleChange}
                    />
                    <Link className="forgot" to={'/'}>Forgot your password?</Link>
                    <br />
                    <button className="login-button">Log in</button>
                </div>
            </form>
            <div className="demo-login">
                <div className="login-container">
                    <button className="login-button" onClick={handleDemoClick}>Demo User</button>
                </div>
            </div>
            <div className="login-component-footer">
                <span>Don't have a Basecamp account?</span>
                <Link className="signup-button" to={'/signup'}> Sign up!</Link>
            </div>
        </div>

    )
}

export default LoginFormPage;
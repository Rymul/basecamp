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

    if (sessionUser) return <Redirect to='/' />;

    const handleChange = (e) => {
        if (e.target.id) {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        if (e.currentTarget.id === "demo"){
            return dispatch(sessionActions.login({email:"demo@user.com", password:"password"}))
        }

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
                    // const newError = Object.values([data])[0]
                    // setErrors([newError.slice(12,newError.length-4)])
                    const newError = JSON.parse(data)
                    setErrors(newError.errors)
                    // setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
                    
                // const x = Object.values(errors)[0]
                // console.log(x.slice(12,x.length-4), "errors")
                // console.log(data, 'data')
                
                // errors.map(error => console.log(error[0], 'error'));
                // Object.values(data).map(error => console.log(error, 'error'));
            });

    }

    return (
        <div className="login-component">  
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="title">
                    <h1>Welcome Back!</h1>
                    <p>Let's get you outside.</p>
                </div>
                <div className="login-container">
                    <input 
                        className="session-form-control"
                        id='email' 
                        type="email"
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
                    <button className="login-button" id="demo" onClick={handleSubmit}>Demo User</button>
                </div>
            </div>
            <div className="login-component-footer">
                <span>Don't have a Basecamp account?</span>
                <Link className="to-signup-button" to={'/signup'}> Sign up!</Link>
            </div>
            <div className="errors">
                    {errors.map(error => <li className="error" key={error}>{error}</li>)}
            </div>
        </div>

    )
}

export default LoginFormPage;
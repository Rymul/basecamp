import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './SignupForm.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, zipcode, password }))
                .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); 
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
        //   }
        //   return setErrors(['Passwords must match']);
    }

    return (
        <div className="signup-component">
            
            <form className="signup-form" onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <div className="title">
                    <h1>Join Basecamp!</h1>
                    <p>Discover the best camping near me</p>
                </div>
                <div className="signup-container">
                    <div className="name-inputs">
                        <input 
                            className="name-form-control"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input 
                            className="session-form-control"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <input 
                        className="session-form-control"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        className="session-form-control"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        className="session-form-control"
                        type="text"
                        placeholder="Zip code"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                    <button className="signup-button">Join Basecamp</button>
                </div>
            </form>
            <div className="signup-component-footer">
                <span>Have an account?</span>
                <Link className="to-login-button" to={'/login'}> Sign in</Link>
            </div>
        
        </div>
    )
}

export default SignupForm;
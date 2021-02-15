import React, { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {generate as generateHash, verify as verifyHash} from 'password-hash'
import { UsernameHook } from './app';

export default function Register() {
	const [{username}, dispatch] = UsernameHook();
    
    const usernameTyped = useRef();
    const [validUsername, setValidUsername] = useState(true);
    const password = useRef();
    const passwordConfirm = useRef();
    const [passwordsMatch, setPasswordMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    function handleInputUsername(event) {
        event.preventDefault();
        if(false) { //si le username est déjà pris
            setValidUsername(false);
        }
	}

    function checkMatchingPasswords(event) {
        event.preventDefault();
        setPasswordMatch(password.current.value === passwordConfirm.current.value ? true : false);
	}
    
    function handleSubmitRegister(event) {
		event.preventDefault();
        setIsLoading(true);
        
        if(!passwordsMatch) {return;}
        const hashedPassword = generateHash(password.current.value);
        // setTimeout(() => {
        //     console.log(hashedPassword);
        //     history.push(`/`);
        // }, 2000);
        const body = JSON.stringify({
			role: "user",
			login: usernameTyped.current.value,
			password: hashedPassword
		});

		fetch(
            `http://localhost:3000/user`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body
            }
        )
        .then(() => {
            localStorage.setItem('username', usernameTyped.current.value);
            dispatch({newUsername:usernameTyped.current.value});
            history.push(`/`);
        }).catch(error => {
            setValidUsername(false);
            console.error(error);
            setIsLoading(false);
        });
	}

	return (
        <div className="container mt-5">
            <div className="col-md-5 mx-auto">
                <div className="card p-4">
                    <div className="text-center mb-3">
                        <h1>Register</h1>
                    </div>
                    <form onSubmit={event => handleSubmitRegister(event)}>
                        <p className="text-muted"> Please enter your login and password!</p>
                        <div className="form-group">
                            <label htmlFor="usernameInput">Username</label>
                            <input
                                type="text"
                                ref={usernameTyped}
                                onChange={handleInputUsername}
                                className={"form-control "+ (validUsername ? "" : "is-invalid")}
                                id="usernameInput"
                                placeholder="Enter username"
                                readOnly = {isLoading}
                                required
                            ></input>
                            <div className="invalid-feedback">Username already used.</div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="passwordInputLogin">Password</label>
                            <input
                                type="password"
                                ref={password}
                                onChange={checkMatchingPasswords}
                                className="form-control"
                                id="passwordInputLogin"
                                placeholder="Password"
                                readOnly = {isLoading}
                                required
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPasswordInputLogin">Confirm password</label>
                            <input
                                type="password"
                                ref={passwordConfirm}
                                onChange={checkMatchingPasswords}
                                className={"form-control "+ (passwordsMatch ? "" : "is-invalid")}
                                id="confirmPasswordInputLogin"
                                placeholder="Confirm password"
                                readOnly = {isLoading}
                                required
                            ></input>
                            <div className="invalid-feedback">Passwords do not match.</div>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <NavLink className="nav-link pl-0" to="/login">I have an account</NavLink>
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>{!isLoading ? 'Register' : 'Loading...'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
	);
}

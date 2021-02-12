import React, { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {generate as generateHash, verify as verifyHash} from 'password-hash'
import { UsernameHook } from './app';

export default function Login() {
	const [{username}, dispatch] = UsernameHook();

    const [isLoading, setIsLoading] = useState(false);
    const usernameTyped = useRef();
    const password = useRef();
    let history = useHistory();

    function handleSubmitLogin(event) {
		event.preventDefault();
        setIsLoading(true);

        var hashedPassword = generateHash('toto'); //remplacer par un get du password en bdd
        setTimeout(() => {
            localStorage.setItem('username', usernameTyped.current.value);
            dispatch({newUsername:usernameTyped.current.value});
            history.push(`/`);
        }, 1000);
        
		// const body = JSON.stringify({
		// 	role: "user",
		// 	login: usernameTyped.current.value.toString().toLowerCase(),
		// 	password: hashedPassword
		// });
		// fetch(
        //     `http://localhost:3000/user`,
        //     {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body
        //     }).then(response => response.json())
		// 	.then(res => console.log(res));
	}

	return (
        <div className="container mt-5">
            <div className="col-md-5 mx-auto">
                <div className="card p-4">
                    <div className="text-center mb-3">
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={event => handleSubmitLogin(event)}>
                        <p className="text-muted"> Please enter your login and password!</p>
                        <div className="form-group">
                            <label htmlFor="usernameInputLogin">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usernameInputLogin"
                                placeholder="Enter username"
                                readOnly = {isLoading}
                                ref={usernameTyped}
                                required
                                autoFocus
                            ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInputLogin">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInputLogin"
                                placeholder="Password"
                                readOnly = {isLoading}
                                ref={password}
                                required
                            ></input>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <NavLink className="nav-link pl-0" to="/register">Create account</NavLink>
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>{!isLoading ? 'Login' : 'Loading...'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
	);
}

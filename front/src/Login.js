import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {generate as generateHash, verify as verifyHash} from 'password-hash'

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const username = useRef();
    const password = useRef();

    function handleSubmitLogin(event) {
		event.preventDefault();
        setIsLoading(true);

        var hashedPassword = generateHash('toto'); //remplacer par un get du password en bdd
        console.log(verifyHash(password.current.value, hashedPassword));
        
		/*const body = JSON.stringify({
			title: titleInput.current.value,
			description: descriptionInput.current.value,
			thumbnail: thumbnailInput.current.value,
		});*/
		//fetch(`http://localhost:8080/api/videos`, { method: 'POST', body })
		//	.then(response => response.json())
		//	.then(({ id }) => history.push(`/videos/${id}`));
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
                                ref={username}
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

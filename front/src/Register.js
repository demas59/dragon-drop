import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Register() {
    const [password, setPassword] = useState(``);
    const [passwordConfirm, setPasswordConfirm] = useState(``);

    const [passwordsMatch, setPasswordMatch] = useState(``);

    function handleInputPasswordChange(event) {
        event.preventDefault();
        setPassword(event.target.value);
        event.target.value === passwordConfirm ? setPasswordMatch("") : setPasswordMatch("is-invalid");
	}

    function handleInputPasswordConfirmChange(event) {
        event.preventDefault();
		setPasswordConfirm(event.target.value);
        password === event.target.value ? setPasswordMatch("") : setPasswordMatch("is-invalid");
	}

	return (
        <div className="container mt-5">
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <div className="card p-4">
                        <div className="text-center mb-3">
                            <h1>Register</h1>
                        </div>
                        <form>
                            <p className="text-muted"> Please enter your login and password!</p>
                            <div className="form-group">
                                <label for="emainInputLogin">Username</label>
                                <input type="email" className="form-control" id="emainInputLogin" aria-describedby="emailHelp" placeholder="Enter username"></input>
                            </div>
                            <div className="form-group">
                                <label for="passwordInputLogin">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handleInputPasswordChange}
                                    className="form-control"
                                    id="passwordInputLogin"
                                    placeholder="Password"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label for="confirmPasswordInputLogin">Confirm password</label>
                                <input
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={handleInputPasswordConfirmChange}
                                    className={"form-control "+passwordsMatch}
                                    id="confirmPasswordInputLogin"
                                    placeholder="Confirm password"
                                ></input>
                                <div className="invalid-feedback">Passwords do not match.</div>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <NavLink className="nav-link pl-0" to="/login">I have an account</NavLink>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
	);
}

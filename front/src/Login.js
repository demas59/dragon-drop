import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Login() {
	return (
        <div className="container mt-5">
            <div class="row justify-content-md-center">
                <div class="col-md-5">
                    <div class="card p-4">
                        <div className="text-center mb-3">
                            <h1>Login</h1>
                        </div>
                        <form>
                            <p class="text-muted"> Please enter your login and password!</p>
                            <div class="form-group">
                                <label for="emainInputLogin">Username</label>
                                <input type="email" class="form-control" id="emainInputLogin" aria-describedby="emailHelp" placeholder="Enter username"></input>
                            </div>
                            <div class="form-group">
                                <label for="passwordInputLogin">Password</label>
                                <input type="password" class="form-control" id="passwordInputLogin" placeholder="Password"></input>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <NavLink class="nav-link pl-0" to="/register">Create account</NavLink>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
	);
}

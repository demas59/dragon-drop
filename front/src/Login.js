import React, { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { generate as generateHash, verify as verifyHash } from 'password-hash';
import { ConnectedUserHook } from './app';

export default function Login() {
	const [{ connectedUsed }, dispatch] = ConnectedUserHook();

	const [isLoading, setIsLoading] = useState(false);
	const [validLogin, setValidLogin] = useState(true);
	const usernameTyped = useRef();
	const password = useRef();
	let history = useHistory();

	function handleSubmitLogin(event) {
		event.preventDefault();
		setIsLoading(true);

		const body = JSON.stringify({
			role: 'user',
			login: usernameTyped.current.value.toString().toLowerCase(),
			password: password.current.value,
		});
		fetch(`http://localhost:3000/signIn`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body,
		})
			.then(response => response.json())
			.then(res => {
				if (res.error && res.error === 'Invalid login or password') {
					password.current.value = '';
					setIsLoading(false);
					setValidLogin(false);
				} else {
					localStorage.setItem('connectedUser', JSON.stringify(res));
					dispatch({ connectedUser: res });
					history.push(`/`);
				}
			})
			.catch(error => {
				password.current.value = '';
				setIsLoading(false);
				setValidLogin(false);
				console.error(error);
			});
	}

	return (
		<div className="container mt-5">
			<div className="col-md-5 mx-auto">
				<div className="card p-4">
					<div className="text-center mb-3">
						<div className="h1">Login</div>
					</div>
					<form onSubmit={event => handleSubmitLogin(event)}>
						<p className="text-muted"> Please enter your login and password!</p>
						<div className={validLogin ? 'd-none' : 'text-danger mb-2'}>
							Invalid login or username.
						</div>
						<div className="form-group">
							<label htmlFor="usernameInputLogin">Username</label>
							<input
								type="text"
								className="form-control"
								id="usernameInputLogin"
								placeholder="Enter username"
								readOnly={isLoading}
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
								readOnly={isLoading}
								ref={password}
								required
							></input>
						</div>
						<div className="d-flex justify-content-between mt-4">
							<NavLink className="nav-link pl-0" to="/register">
								Create account
							</NavLink>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isLoading}
							>
								{!isLoading ? 'Login' : 'Loading...'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

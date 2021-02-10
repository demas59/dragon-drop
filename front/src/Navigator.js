import React from 'react';
import Thread from './Thread';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyAccount from './MyAccount';

export default function Navigator() {
	return (
		<Switch>
			<Route exact path="/">
				<Thread />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>
			<Route exact path="/myaccount">
				<MyAccount />
			</Route>
		</Switch>
	);
}

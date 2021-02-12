import React from 'react';
import Thread from './Thread';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyAccount from './MyAccount';
import NewPost from './NewPost';

export default function Navigator() {
	return (
		<Switch>
			<Route exact path="/">
				<NewPost />
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
			<Route exact path="/newPost">
				<Thread />
			</Route>
		</Switch>
	);
}

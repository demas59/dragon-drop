import React, { useEffect, useState } from 'react';
import Thread from './Thread';
import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyAccount from './MyAccount';
import NewPost from './NewPost';
import UpdatePost from './UpdatePost';
import UserList from './UserList';

export default function Navigator() {
	const location = useLocation();
	const [state, setState] = useState({});

	useEffect(() => {
		if(location.state) {
			setState(
				location.state
			);
		}
	 }, [location]);

	return (
		<Switch>
			<Route exact path="/">
				<Thread search={state} />
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
				<NewPost />
			</Route>
			<Route exact path="/userList">
				<UserList />
			</Route>
			<Route exact path="/updatePost">
				<UpdatePost postToUpdate={state} />
			</Route>
		</Switch>
	);
}

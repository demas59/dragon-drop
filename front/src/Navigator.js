import React, { useEffect, useState } from 'react';
import Thread from './Thread';
import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MyAccount from './MyAccount';
import NewPost from './NewPost';

export default function Navigator() {
	const location = useLocation();
	const [search, setSearch] = useState({});

	useEffect(() => {
		if(location.state) {
			setSearch(
				location.state
			);
		}
	 }, [location]);

	return (
		<Switch>
			<Route exact path="/">
				<Thread search={search} />
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
		</Switch>
	);
}

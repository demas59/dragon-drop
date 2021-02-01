import React from 'react';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import VideoForm from './VideoForm';
import Thread from './Thread';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export default function Navigator() {
	return (
		<Switch>
			<Route exact path="/">
				<Thread />
			</Route>
			<Route exact path="/thread">
				<VideoList />
			</Route>
			<Route exact path="/videos/new">
				<VideoForm />
			</Route>
			<Route exact path="/videos/:id">
				<VideoDetail />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>
		</Switch>
	);
}

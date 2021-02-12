import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UsernameHook } from './app';

export default function Menu() {
	const [{username}, dispatch] = UsernameHook();

	useEffect(() => {
		if(localStorage.getItem('username')) {
			dispatch({newUsername:localStorage.getItem('username')});
		}
	}, []);
	
	function handleSearchSubmit(event) {
		event.preventDefault();
		console.log('coucou');
	}

	return (
		<Navbar className="justify-content-between navbar-light bg-light">
			<img style={{height: '3em'}} className="navbar-brand" src="../images/logoDragonDrop.png"></img>
			<form className="form-inline" onSubmit={event => handleSearchSubmit(event)}>
				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
			<div className="navbar-nav">
				<NavLink className="nav-link" to="/">Thread</NavLink>
				{username && username.length>0?
					<NavLink className="nav-link" to="/myAccount">My account ({username})</NavLink>
				:
					<NavLink className="nav-link" to="/login">Login</NavLink>
				}
				<NavLink className="nav-link" to="/newPost">TMP THREAD</NavLink>
			</div>
		</Navbar>
	);
}

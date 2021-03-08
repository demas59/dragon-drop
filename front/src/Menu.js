import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { ConnectedUserHook } from './app';

export default function Menu() {
	let history = useHistory();
	const [{connectedUser}, dispatch] = ConnectedUserHook();
	const [{wellFormattedUsername}, setWellFormattedUsername] = useState("");
	const search = useRef();

	useEffect(() => {
		if(JSON.parse(localStorage.getItem('connectedUser')) && JSON.parse(localStorage.getItem('connectedUser')).login) {
			dispatch({connectedUser:JSON.parse(localStorage.getItem('connectedUser'))});
		}
	}, []);
	
	function handleSearchSubmit(event) {
		event.preventDefault();
		history.push({
			pathname: '/',
			state: { search: search.current.value }
		});
		
	}

	return (
		<Navbar className="justify-content-between navbar-light bg-light">
			<img style={{height: '3em'}} className="navbar-brand" src="../images/logoDragonDrop.png"></img>
			<form className="form-inline" onSubmit={event => handleSearchSubmit(event)}>
				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" ref={search}></input>
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
			<div className="navbar-nav">
				<NavLink 
					className="nav-link" 
					to={{
						pathname: '/',
						state: {}
					}}
				>Thread</NavLink>
				{connectedUser && connectedUser.login?
					<NavLink className="nav-link" to="/newPost">New post</NavLink>
				:
					""
				}
				
				{connectedUser && connectedUser.login?
					<NavLink className="nav-link" to="/myAccount">My account ({connectedUser.login})</NavLink>
				:
					<NavLink className="nav-link" to="/login">Login</NavLink>
				}
			</div>
		</Navbar>
	);
}

import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
		//localStorage.setItem("search", JSON.stringify())
		history.push({
			pathname: '/',
			state: { search: search.current.value }
		});
	}

	function handleMyPostsClick() {
		localStorage.setItem("myAccountSearch", "myPosts");
		history.push('/myAccount');
	}

	function handleMyFavouritesClick() {
		localStorage.setItem("myAccountSearch", "favourites");
		history.push('/myAccount');
	}

	function handleCloseFriendsClick() {
		history.push("/userList");

	}

	function handleDisconnect() {
		localStorage.clear();
        dispatch({connectedUser:{}});
        history.push('/');
	}

	return (
		<Navbar className="justify-content-between navbar-light bg-light">
			<img style={{height: '3em'}} className="navbar-brand" src="../images/logoDragonDrop.png"></img>
			<form className="form-inline" onSubmit={event => handleSearchSubmit(event)}>
				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" ref={search}></input>
				<button className="btn btn-brown my-2 my-sm-0" type="submit">Search</button>
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
				{connectedUser && connectedUser.role === "admin"?
					<NavLink className="nav-link" to="/userList">User list</NavLink>
				:
					""
				}
				
				{connectedUser && connectedUser.login?
					<NavDropdown title={`My account (${connectedUser.login})`} id="basic-nav-dropdown">
						<NavDropdown.Item  onClick={() => handleMyPostsClick()}>My posts</NavDropdown.Item>
						<NavDropdown.Item onClick={() => handleMyFavouritesClick()}>My Favourites</NavDropdown.Item>
						<NavDropdown.Item onClick={() => handleCloseFriendsClick()}>Close friends</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={() => handleDisconnect()}>Disconnect</NavDropdown.Item>
					</NavDropdown>
				:
					<NavLink className="nav-link" to="/login">Login</NavLink>
				}
			</div>
		</Navbar>
	);
}

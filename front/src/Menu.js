import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu() {
	return (
		<Navbar className="justify-content-between navbar-light bg-light">
			<img style={{height: '3em'}} className="navbar-brand" src="../images/logoDragonDrop.png"></img>
			<form className="form-inline">
				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
				<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
			<div className="navbar-nav">
				<NavLink className="nav-link" o="/">Thread</NavLink>
				<NavLink className="nav-link" to="/login">Login</NavLink>
			</div>
		</Navbar>
	);
}

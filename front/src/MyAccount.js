import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UsernameHook } from './app';

export default function MyAccount() {
	const [{username}, dispatch] = UsernameHook();
    let history = useHistory();

    useEffect(() => {
		if(!localStorage.getItem('username') || localStorage.getItem('username') === "") {
            history.push(`/login`);
        }
	});

    function handleDisconnectClick(event) {
        localStorage.clear();
        dispatch({newUsername:""});
        history.push('/');
    }
    
	return (
        <div>
            <a onClick={() => handleDisconnectClick()}>disconnect</a>
            <NavLink className="" to="/addPost">Add a post</NavLink>
        </div>
    );
}

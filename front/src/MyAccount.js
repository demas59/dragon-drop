import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ConnectedUserHook } from './app';

export default function MyAccount() {
	const [{connectedUser}, dispatch] = ConnectedUserHook();
    let history = useHistory();

    useEffect(() => {
		if(!JSON.parse(localStorage.getItem('connectedUser')) || !JSON.parse(localStorage.getItem('connectedUser')).login) {
            history.push(`/login`);
        }
	});

    function handleDisconnectClick(event) {
        localStorage.clear();
        dispatch({connectedUser:{}});
        history.push('/');
    }
    
	return (
        <div>
            <a onClick={() => handleDisconnectClick()}>disconnect</a>
            <NavLink className="" to="/newPost">New post</NavLink>
            <NavLink className="" to="/userList">Close friends</NavLink>
        </div>
    );
}

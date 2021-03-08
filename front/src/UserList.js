import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ConnectedUserHook } from './app';

export default function UserList() {
	const [{connectedUser}, dispatch] = ConnectedUserHook();
    const [userList, setUserList] = useState([]);
    let history = useHistory();

    useEffect(() => {
		if(!connectedUser || !connectedUser.login) {
            history.push(`/login`);
        }
        fetchUserList();
	}, []);

    function fetchUserList() {
        fetch(`http://localhost:3000/user`)
        .then(response => response.json())
        .then(res => {
            setUserList(res.filter(user => {
                return user.login.toLowerCase() !== connectedUser.login.toLowerCase()
            }).map(user => {
                console.log(connectedUser)
                if(connectedUser.friends.indexOf(user.login) > -1){
                    return {
                        login: user.login,
                        isCloseFriend: true
                    }
                }else {
                    return {
                        login: user.login,
                        isCloseFriend: false
                    };
                }
            }));
        });
    }
    
    if(userList.length===0) {
        return (
            <div className="container">
                <div className="col-7 mx-auto p-4">
                    <div className="text-center">
                    There is no other user... :(
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
                <div className="col-7 mx-auto p-4">
                    <div className="text-center mb-3">
						<h1>{connectedUser.role ==="admin"? "User list and close friends" : "Close friends"}</h1>
					</div>
                    <ul className="list-group">
                        {userList.map(user => {
                            return (
                                <li className="list-group-item" key={user.login}>
                                    <div className="d-flex justify-content-between">
                                        <span>{user.login}</span>
                                        <div>{user.isCloseFriend?"oui" : "non"}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        
    );
}

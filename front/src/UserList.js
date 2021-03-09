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

    function handleAddCloseFriend(login) {
        connectedUser.friends.push(login);
        const userToUpdate = {
            _id: connectedUser._id,
            friends: connectedUser.friends
        }
        fetch(`http://localhost:3000/user`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(userToUpdate)
		}).then(() => {
            localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
            dispatch({ connectedUser: connectedUser });
            fetchUserList();
		});
    }

    function handleRemoveCloseFriend(login) {
        connectedUser.friends = connectedUser.friends.filter(user => user.toLowerCase() !== login.toLowerCase());
        const userToUpdate = {
            _id: connectedUser._id,
            friends: connectedUser.friends
        }
        fetch(`http://localhost:3000/user`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(userToUpdate)
		}).then(() => {
            localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
            dispatch({ connectedUser: connectedUser });
            fetchUserList();
		});
    }

    function handleDeleteUser(login) {
        fetch(`http://localhost:3000/user/${login}`, {
			method: 'DELETE',
		}).then(() => {
            fetchUserList();
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
						<h1>{connectedUser.role ==="admin"? "Close friends and user list" : "Close friends"}</h1>
					</div>
                    <ul className="list-group">
                        {userList.map(user => {
                            return (
                                <li className="list-group-item" key={user.login}>
                                    <div className="d-flex justify-content-between">
                                        <span>{user.login}</span>
                                        <div>
                                            <div>
                                                {!user.isCloseFriend? (
                                                    <img
                                                        src={`../images/plus.png`}
                                                        alt="UserAdd"
                                                        title="Add as close friend"
                                                        onClick={() => handleAddCloseFriend(user.login)}
                                                        style={{ cursor: 'pointer', height: '24px' }}
                                                    ></img>
                                                ) : (
                                                    <img
                                                        src={`../images/minus.png`}
                                                        alt="UserRemove"
                                                        title="Remove as close friend"
                                                        onClick={() => handleRemoveCloseFriend(user.login)}
                                                        style={{ cursor: 'pointer', height: '24px' }}
                                                    ></img>
                                                )}
                                                {connectedUser.role === "admin"?
                                                    (
                                                        <img
                                                            src={`../images/trash.png`}
                                                            className="ml-3"
                                                            alt="UserRemove"
                                                            title="Delete user"
                                                            onClick={() => handleDeleteUser(user.login)}
                                                            style={{ cursor: 'pointer', height: '24px' }}
                                                        ></img>
                                                    ) : ""
                                                }
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        
    );
}

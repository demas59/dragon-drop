import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ConnectedUserHook } from './app';
import Post from './Post';

export default function MyAccount() {
	const [{connectedUser}, dispatch] = ConnectedUserHook();
	const [posts, setPosts] = useState([]);
    let history = useHistory();

    useEffect(() => {
		if(!connectedUser || !connectedUser.login) {
            history.push(`/login`);
        }
        if(localStorage.getItem("myAccountSearch") === "favourites") {
            fetchFavourites();
        }else {
            fetchMyPosts();
        }
	});

    function fetchFavourites() {
        setPosts(connectedUser.favourite);
    }
    
    function fetchMyPosts() {
        fetch(`http://localhost:3000/post/creator/${connectedUser.login}`)
        .then(response => response.json())
        .then(postList => {
            setPosts(postList.map(post => post._id));
        });
    }
    
	return (
        <div className="mb-4">
            <div className="h1 w-100 text-center mt-4 mb-4">{(localStorage.getItem("myAccountSearch") === "favourites") ? "My favourites" : "My posts"}</div>
			{posts.map(id => {
				return <Post idPost={id}  key={id}></Post>;
			})}
		</div>
    );
}

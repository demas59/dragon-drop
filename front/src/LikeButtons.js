import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UsernameHook } from './app';

export default function LikeButtons({likes, fetchPost, idPost}) {
	const username = localStorage.getItem('username');

	const [likeValue, setLikeValue] = useState(0);
    let history = useHistory();
	

	useEffect(() => {
		updateLikeValue();
	});

	function updateLikeValue() {
		if(!username || username.length === 0) {
			setLikeValue(0);
			return;
		}

		const foundLike = likes.find(like => like.userName === username);
		if(!foundLike) {setLikeValue(0); return;}
		setLikeValue(foundLike.value);
	}

	function handleLikeClick() {
		if(!username){history.push(`/login`);}

		let updateLikeValue = (likeValue===1)?0:1;

		fetch(`http://localhost:3000/post/like/${idPost}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({userName: username, likeValue: updateLikeValue})
		}).then(() => fetchPost());
	}
    
	function handleDislikeClick() {
		if(!username){history.push(`/login`);}

		let updateLikeValue = (likeValue===-1)?0:-1;

        fetch(`http://localhost:3000/post/like/${idPost}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({userName: username, likeValue: updateLikeValue})
		}).then(() => fetchPost());
	}

	return (
		<div>
            <div className="w-100 text-center"><img src={`../images/arrow-up${likeValue===1?"-selected":""}.png`} alt="Arrow up" onClick={() => handleLikeClick()} style={{cursor: 'pointer'}}></img></div>
            <div className="w-100 text-center">{likes.reduce((total, like) => {return total+like.value}, 0)}</div>
            <div className="w-100 text-center"><img src={`../images/arrow-down${likeValue===-1?"-selected":""}.png`} alt="Arrow down" onClick={() => handleDislikeClick()} style={{cursor: 'pointer'}}></img></div>
		</div>
	);
}

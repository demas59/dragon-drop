import React, { useState } from 'react';
import { UsernameHook } from './app';

export default function LikeButtons({likes}) {

	const [{username}, dispatch] = UsernameHook();

	function handleLikeClick() {
		//fetch(`http://localhost:8080/api/videos/${id}/likes`, {
		//	method: 'POST',
		//}).then(() => fetchPost());
        console.log("like");
	}
    
	function handleDislikeClick() {
        //fetch(`http://localhost:8080/api/videos/${id}/dislikes`, {
        //	method: 'POST',
        //}).then(() => fetchPost());
        console.log("dislike");
	}

	return (
		<div>
            <div className="w-100 text-center"><img src="../images/arrow-up.png" alt="Arrow up" onClick={() => handleLikeClick()} style={{cursor: 'pointer'}}></img></div>
            <div className="w-100 text-center">{likes.reduce((total, like) => {return total+like.value}, 0)}</div>
            <div className="w-100 text-center"><img src="../images/arrow-down.png" alt="Arrow down" onClick={() => handleDislikeClick()} style={{cursor: 'pointer'}}></img></div>
		</div>
	);
}

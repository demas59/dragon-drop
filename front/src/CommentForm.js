import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CommentsForm({idPost, fetchPost}) {
	const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
	const [isLoading, setIsLoading] = useState(false);
	const commentTyped = useRef();
    let history = useHistory();

	function handleSubmitComment(event) {
		if(!connectedUser || !connectedUser.login){history.push(`/login`);return;}
		event.preventDefault();
		setIsLoading(true);
		
		fetch(`http://localhost:3000/post/comment/${idPost}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({userName: connectedUser.login, value: commentTyped.current.value})
		}).then(() => {
            setIsLoading(false);
			commentTyped.current.value="";
			fetchPost();
			return;
		});
	}

	if(!connectedUser || !connectedUser.login) {
		return (
			<div className="text-muted mb-2">
				You need to be logged in to write a comment.
			</div>
		);
	}

	return (
		<form onSubmit={event => handleSubmitComment(event)}>
			<div className="form-group mb-2">
				<div htmlFor="commentInput" className="h6 mt-1 mb-1">Add a comment :</div>
				<textarea
					className="form-control"
					id="commentInput"
					ref={commentTyped}
					placeholder="Enter your comment"
					required
					readOnly={isLoading}
				></textarea>
			</div>
			<div className="w-100 text-right">
				<button
					type="submit"
					className="btn btn-outline-secondary"
					disabled={isLoading}
				>Send</button>
			</div>
		</form>
	);
}

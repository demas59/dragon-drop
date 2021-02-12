import React, { useRef, useState } from 'react';

export default function CommentsForm(props) {
	const [isLoading, setIsLoading] = useState(false);
	const commentTyped = useRef();

	function handleSubmitComment(event) {
		event.preventDefault();
		setIsLoading(true);
		console.log(commentTyped.current.value);
		
		setTimeout(() => {
            setIsLoading(false);
			commentTyped.current.value="";
        }, 1000);
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

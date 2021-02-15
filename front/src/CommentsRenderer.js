import React, { useState } from 'react';
import CommentsForm from './CommentForm';

export default function CommentsRenderer({comments}) {
    const [displayComments, setDisplayComments] = useState(false);

	if(!displayComments) { //comments not displayed
		if(comments.length === 0){//no comments
			return (
				<div>No commentary.</div>
			);
		}else { //ask to display comments
			return (
				<a href="#" onClick={() => setDisplayComments(true)}>Display comments... ({comments.length})</a>
			);
		}
	}

	return (
		<div>
			<a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a>
			{comments.map(comment => {
				return (
					<div className="container pl-2">
						<div className="h6 mt-1 mb-0">{comment.writer}</div>
						<div>{comment.value}</div>
					</div>
				);
			})}
			<div className="container pl-2 mt-2"><CommentsForm></CommentsForm></div>
			{comments.length > 5 ? <a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a> : ""}
		</div>
	);
}

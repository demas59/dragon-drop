import React, { useState } from 'react';

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
					<div>
						{comment.writer} {comment.value}
					</div>
				);
			})}
			{comments.length > 5 ? <a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a> : ""}
		</div>
	);
}

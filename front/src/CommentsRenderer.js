import React, { useEffect, useState } from 'react';
import CommentsForm from './CommentForm';

export default function CommentsRenderer({comments, idPost, fetchPost}) {
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

	function CommentView({idComment}) {
		const [comment, setComment] = useState();

		useEffect(() => {
			fetchComment();
		}, []);

		function fetchComment(){
			fetch(`http://localhost:3000/comment/${idComment}`)
				.then(response => response.json())
				.then(sentComment => setComment(sentComment));
		}

		if(!comment) {
			return "";
		}

		return (
			<div className="container pl-2">
				<div className="h6 mt-1 mb-0">{comment.userName}</div>
				<div>{comment.value}</div>
			</div>
		);
	}

	return (
		<div>
			<a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a>
			{comments.map(commentId => {
				return (
					<CommentView idComment={commentId} key={commentId}></CommentView>
				);
			})}
			<div className="container pl-2 mt-2"><CommentsForm idPost={idPost} fetchPost={() => fetchPost()}></CommentsForm></div>
			{comments.length > 5 ? <a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a> : ""}
		</div>
	);
}

import React, { useEffect, useState } from 'react';
import CommentsForm from './CommentForm';

export default function CommentsRenderer({comments, idPost, fetchPost}) {
	const username = localStorage.getItem('username');
    const [displayComments, setDisplayComments] = useState(false);

	if(!displayComments) { //comments not displayed
		if(comments.length === 0){//no comments
			return (
				<div>
					No commentary.
					<CommentsForm idPost={idPost} fetchPost={() => fetchPost()}></CommentsForm>
				</div>
			);
		}else { //ask to display comments
			return (
				<a href="#" onClick={() => setDisplayComments(true)}>Display comments... ({comments.length})</a>
			);
		}
	}

	function CommentView({idComment, idPost}) {
		const [comment, setComment] = useState();

		useEffect(() => {
			fetchComment();
		}, []);

		function fetchComment(){
			console.log(username.toLocaleLowerCase());
			fetch(`http://localhost:3000/comment/${idComment}`)
				.then(response => response.json())
				.then(sentComment => setComment(sentComment));
		}

		function handleDelete() {
			fetch(`http://localhost:3000/post/comment/${idPost}/${idComment}`, {
				method: 'DELETE'
			}).then(() => {
				setComment(null);
				return;
			});
		}

		if(!comment) {
			return "";
		}

		return (
			<div className="container pl-2 d-flex justify-content-between">
				<div>
					<div className="h6 mt-1 mb-0">{comment.userName}</div>
					<div>{comment.value}</div>
				</div>
				{
					(username && (username.toLocaleLowerCase()===comment.userName.toLocaleLowerCase() || username.toLocaleLowerCase()==="admin")) ?
					<div><img src={`../images/trash.png`} alt="Trash" onClick={() => handleDelete()} style={{cursor: 'pointer'}}></img></div>
					: ""
				}
				
			</div>
		);
	}

	return (
		<div>
			<a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a>
			{comments.map(commentId => {
				return (
					<CommentView idComment={commentId} key={commentId} idPost={idPost}></CommentView>
				);
			})}
			<div className="container pl-2 mt-2"><CommentsForm idPost={idPost} fetchPost={() => fetchPost()}></CommentsForm></div>
			{comments.length > 5 ? <a href="#" onClick={() => setDisplayComments(false)}>Hide comments</a> : ""}
		</div>
	);
}

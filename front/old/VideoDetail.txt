import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentRenderer from './CommentRenderer';

export default function VideoDetail() {
	const [video, setVideo] = useState(null);
	const [comments, setComments] = useState([]);
	const player = useRef();
	let { id } = useParams();

	useEffect(() => {
		fetchDetail();
		fetchComments();
	}, []);

	function fetchDetail() {
		fetch(`http://localhost:8080/api/videos/${id}`)
			.then(response => response.json())
			.then(video => setVideo(video));
	}

	function fetchComments() {
		fetch(`http://localhost:8080/api/videos/${id}/comments`)
			.then(response => response.json())
			.then(comments => setComments(comments));
	}

	function handleLikeClick() {
		fetch(`http://localhost:8080/api/videos/${id}/likes`, {
			method: 'POST',
		}).then(() => fetchDetail());
	}

	function handleDislikeClick() {
		fetch(`http://localhost:8080/api/videos/${id}/dislikes`, {
			method: 'POST',
		}).then(() => fetchDetail());
	}

	function handleCommentSubmit(newComment) {
		return fetch(`http://localhost:8080/api/videos/${id}/comments`, {
			method: 'POST',
			body: JSON.stringify(newComment),
		}).then(() => fetchComments());
	}

	if (!video) {
		return <div className="videoDetail is-loading"></div>;
	}
	const { title, description, file, likes, dislikes } = video;

	return (
		<div className="videoDetail">
			<Link className="backButton" to="/">
				&lt; Retour
			</Link>
			<video
				style={{ width: '100%', backgroundColor: 'black' }}
				height="400"
				controls
				src={'/uploads/' + file}
				ref={player}
			></video>
			<button onClick={() => player.current.play()}>play</button>
			<button onClick={() => player.current.pause()}>pause</button>
			<header>
				<h1>{title}</h1>
				<div className="likesContainer">
					<button className="like" onClick={() => handleLikeClick()}>
						{likes}
					</button>
					<button className="dislike" onClick={() => handleDislikeClick()}>
						{dislikes}
					</button>
				</div>
			</header>
			{description && <p>{description}</p>}
			<aside className="commentList">
				{comments.length > 0 && <h2>{comments.length} commentaires</h2>}
				<CommentForm onSubmit={handleCommentSubmit} />
				{comments.map(comment => (
					<CommentRenderer comment={comment} key={comment.id} />
				))}
			</aside>
		</div>
	);
}

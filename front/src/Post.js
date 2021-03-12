import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import CommentsRenderer from './CommentsRenderer.js';
import LikeButtons from './LikeButtons.js';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { ConnectedUserHook } from './app.js';

export default function Post({ idPost }) {
	let history = useHistory();
	const [{connectedUser}, dispatch] = ConnectedUserHook();
	const [post, setPost] = useState(null);
	const [deleted, setDeleted] = useState(false);

	useEffect(() => {
		fetchPost();
	}, []);

	function fetchPost() {
		fetch(`http://localhost:3000/post/${idPost}`)
			.then(response => response.json())
			.then(post => setPost(post));
	}

	function handleDeletePost() {
		fetch(`http://localhost:3000/post/${idPost}`, {
			method: 'DELETE',
		}).then(() => {
			setPost(null);
			setDeleted(true);
			return;
		});
	}

	function handleModifyPost() {
		localStorage.setItem('postToUpdate', JSON.stringify(post));
		history.push('/updatePost');
	}

	function handleUsernameClick(username) {
		history.push({
			pathname: '/',
			state: { user: username },
		});
	}

	function handleTagClick(tag) {
		history.push({
			pathname: '/',
			state: { tag: tag },
		});
	}

	function handleAddFavourites(postId) {
        connectedUser.favourite.push(postId);
        const userToUpdate = {
            _id: connectedUser._id,
            favourite: connectedUser.favourite
        }
        fetch(`http://localhost:3000/user`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(userToUpdate)
		}).then(() => {
            localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
            dispatch({ connectedUser: connectedUser });
		});
    }

	function handleRemoveFavourites(postId) {
        connectedUser.favourite = connectedUser.favourite.filter(id => id !== postId);
        const userToUpdate = {
            _id: connectedUser._id,
            favourite: connectedUser.favourite
        }
        fetch(`http://localhost:3000/user`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(userToUpdate)
		}).then(() => {
            localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
            dispatch({ connectedUser: connectedUser });
		});
    }

	const Modal = () => {
		let hasExif = false;
		axios
			.get(`http://localhost:3000/post/exif/${idPost}`)
			.then(res => {
				return (
					<div className="mt-2">
						<Popup
							trigger={
								<img
									onClick={() => handleExifInfos()}
									src={`../images/information-outline.png`}
									style={{ cursor: 'pointer' }}
								></img>
							}
							modal
						>
							<span style={{ backgroundColor: 'whitesmoke' }}>
								{' '}
								Modal content{' '}
							</span>
						</Popup>
					</div>
				);
			})
			.catch(err => {
				console.log(err.message);
			});

		if (hasExif) {
		} else {
			return '';
		}
	};

	if (!post) {
		if (deleted) {
			return '';
		}

		return (
			<div className="container mt-3">
				<div className="col-7 mx-auto">
					<div className="card p-4">
						<div className="mx-auto">
							<div className="spinner-border" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	const { _id, creator, tags, caption, format, comments, likes } = post;
	return (
		<div className="container mt-3">
			<div className="col-7 mx-auto">
				<div className="card p-4">
					<div className="row">
						<div className="col-sm-1"></div>
						<div className="col-sm h4">
							<div
								onClick={() => handleUsernameClick(creator)}
								style={{ cursor: 'pointer', width: 'fit-content' }}
							>
								{creator}
							</div>
						</div>
						<div className="col-sm-1"></div>
					</div>
					<div className="row">
						<div className="col-sm-1 pr-0 pl-3">
							<LikeButtons
								likes={likes}
								fetchPost={() => fetchPost()}
								idPost={idPost}
							></LikeButtons>
							{(connectedUser && connectedUser.favourite) ?
								(connectedUser.favourite.indexOf(_id) > -1) ? 
									(<div className="w-100 text-center mt-1"><img
										src={`../images/star-selected.png`}
										alt="Remove from favorites"
										title="Remove from favorites"
										onClick={() => handleRemoveFavourites(_id)}
										style={{ cursor: 'pointer' }}
									></img></div>)
									:
									(<div className="w-100 text-center mt-1"><img
										src={`../images/star-circle.png`}
										alt="Add to favorites"
										title="Add to favorites"
										onClick={() => handleAddFavourites(_id)}
										style={{ cursor: 'pointer' }}
									></img></div>)
								:
								""
							}
						</div>
						<div className="col-sm text-center">
							<img
								src={`http://localhost:3000/${_id}.${format}`}
								className="img-fluid"
								alt="Responsive image"
							></img>
						</div>
						<div className="col-sm-1 pl-0 pr-3">
							{connectedUser && connectedUser.login &&
							(connectedUser.login.toLocaleLowerCase() === creator.toLocaleLowerCase() ||
							connectedUser.role.toLocaleLowerCase() === 'admin') ? (
								<div>
									<div>
										<img
											src={`../images/trash.png`}
											alt="Trash"
											onClick={() => handleDeletePost()}
											style={{ cursor: 'pointer' }}
										></img>
									</div>
									<div className="mt-2">
										<img
											src={`../images/pen.png`}
											alt="Trash"
											onClick={() => handleModifyPost()}
											style={{ cursor: 'pointer' }}
										></img>
									</div>
								</div>
							) : (
								''
							)}
							{<Modal></Modal>}
						</div>
					</div>
					<div className="row">
						<div className="col-sm-1"></div>
						<div className="col-sm">{caption}</div>
						<div className="col-sm-1"></div>
					</div>
					<div className="row">
						<div className="col-sm-1"></div>
						<div className="col-sm">
							{tags.map((tag, index) => {
								return (
									<button
										type="button"
										key={index}
										onClick={() => handleTagClick(tag)}
										className="pl-0 pr-1 pt-0 pb-0 btn btn-link btn-color-light-blue"
									>
										{'#' + tag}
									</button>
								);
							})}
						</div>
						<div className="col-sm-1"></div>
					</div>
					<div className="row">
						<div className="col-sm-1"></div>
						<div className="col-sm">
							<CommentsRenderer
								comments={comments}
								idPost={idPost}
								fetchPost={() => fetchPost()}
							></CommentsRenderer>
						</div>
						<div className="col-sm-1"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function NewPost() {
	let history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState('');
	const [data, getFile] = useState({ name: '', path: '' });
	const [tagsFormatted, setTagsFormatted] = useState([]);

	const caption = useRef();
	const tags = useRef();
	const closeFriends = useRef();

	useEffect(() => {
		if (
			!JSON.parse(localStorage.getItem('connectedUser')) ||
			!JSON.parse(localStorage.getItem('connectedUser')).login
		) {
			history.push(`/login`);
		}
	});

	function handleFileChange(event) {
		const file = event.target.files[0];
		setFile(file);
	}

	function handleSubmitNewPost(event) {
		setIsLoading(true);
		event.preventDefault();
		const formData = new FormData();
		formData.append('tags', tagsFormatted);
		formData.append('caption', caption.current.value);
		formData.append('creator', JSON.parse(localStorage.getItem('connectedUser')).login);

		if (closeFriends.current.checked) {
			formData.append('visibility', 'hidden');
		} else {
			formData.append('visibility', 'all');
		}

		formData.append('file', file);

		axios
			.post('http://localhost:3000/upload', formData)
			.then(res => {
				getFile({
					name: res.data.name,
					path: 'http://localhost:3000/' + res.data.path,
				});
				setIsLoading(false);
				history.push(`/`);
			})
			.catch(err => {
				console.log(err);
				setIsLoading(false);
			});
	}

	function handleTagsChange(event) {
		const tagsFormatted = event.target.value.trim().split(' ');
		const tmpArray = tagsFormatted.filter(function (tag) {
			return tag != '';
		});
		setTagsFormatted(tmpArray);
	}

	return (
		<div className="container mt-5">
			<div className="col-md-5 mx-auto">
				<div className="card p-4">
					<div className="text-center mb-3">
						<div className="h1">New post</div>
					</div>
					<form onSubmit={event => handleSubmitNewPost(event)}>
						<p className="text-muted"> Create your next post!</p>
						<div className="form-group">
							<label htmlFor="imageInput">Image</label>
							<input
								type="file"
								className="form-control-file"
								id="imageInput"
								onChange={handleFileChange}
								disabled={isLoading}
							></input>
						</div>
						<div className="form-group">
							<label htmlFor="captionInput">Caption</label>
							<input
								className="form-control"
								id="captionInput"
								placeholder="Caption"
								readOnly={isLoading}
								ref={caption}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="tagsInput">Tags (example: tag1 tag2 tag3)</label>
							<input
								type="text"
								className="form-control"
								id="tagsInput"
								placeholder="Tag list"
								onChange={e => handleTagsChange(e)}
								readOnly={isLoading}
								ref={tags}
							></input>
							{tagsFormatted.map((tag, index) => {
								return (
									<span key={index} className="badge badge-pill badge-light">
										#{tag}
									</span>
								);
							})}
						</div>
						<div className="form-group form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="visibilityCheckbox"
								ref={closeFriends}
								disabled={isLoading}
							></input>
							<label className="form-check-label" htmlFor="visibilityCheckbox">
								Only for close friends
							</label>
						</div>
						<div className="d-flex justify-content-between mt-4">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isLoading}
							>
								{!isLoading ? 'Post' : 'Posting ...'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

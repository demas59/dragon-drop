import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function NewPost() {
	let history = useHistory();
	const [progress, setProgress] = useState(false);
	const [file, setFile] = useState('');
	const [data, getFile] = useState({ name: '', path: '' });
	const [caption, setCaption] = useState('');
	const [tags, setTag] = useState('');

	useEffect(() => {
		if (
			!localStorage.getItem('username') ||
			localStorage.getItem('username') === ''
		) {
			history.push(`/login`);
		}
	});

	function handleFileChange(event) {
		const file = event.target.files[0];
		console.log('file', file);
		setFile(file);
	}

	function handleSubmitNewPost(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append('tags', tags);
		formData.append('caption', caption);
		formData.append('creator', localStorage.getItem('username'));
		formData.append('visibility', 'all');
		formData.append('file', file);

		axios
			.post('http://localhost:3000/upload', formData, {
				onUploadProgress: ProgressEvent => {
					let progress =
						Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
						'%';
					setProgress(progress);
				},
			})
			.then(res => {
				console.log('res:', res);
				setProgress(false);
				getFile({
					name: res.data.name,
					path: 'http://localhost:3000/' + res.data.path,
				});
			})
			.catch(err => {
				console.log(err);
				setProgress(false);
			});
	}

	return (
		<div className="container mt-5">
			<div className="col-md-5 mx-auto">
				<div className="card p-4">
					<div className="text-center mb-3">
						<h1>Add a post</h1>
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
							></input>
						</div>
						<div className="form-group">
							<label htmlFor="captionInput">Caption</label>
							<input
								className="form-control"
								id="captionInput"
								placeholder="Caption"
								readOnly={progress}
								onChange={event => setCaption(event.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="tagsInput">Tags</label>
							<input
								type="text"
								className="form-control"
								id="tagsInput"
								placeholder="Tag list"
								readOnly={progress}
								onChange={event => setTag(event.target.value)}
							></input>
						</div>
						<div className="d-flex justify-content-between mt-4">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={progress}
							>
								{!progress ? 'Post' : 'Progress...'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

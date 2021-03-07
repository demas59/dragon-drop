import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function UpdatePost({postToUpdate}) {
	let history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [tagsFormatted, setTagsFormatted] = useState([]);


	const caption = useRef();
	const tags = useRef();
	const closeFriends = useRef();

	useEffect(() => {
		if (
			!localStorage.getItem('username') ||
			localStorage.getItem('username') === ''
		) {
			history.push(`/login`);
		}
	});

	function handleSubmitUpdatePost(event) {
		setIsLoading(true);
		event.preventDefault();


		
	}

	function handleTagsChange(event) {
		const tagsFormatted = event.target.value.trim().split(' ');
		const tmpArray = tagsFormatted.filter(function (tag) {
			return tag != '';
		});
		setTagsFormatted(tmpArray);
	}


    if (!postToUpdate || !postToUpdate.post) {
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
	return (
		<div className="container mt-5">
			<div className="col-md-5 mx-auto">
				<div className="card p-4">
					<div className="text-center mb-3">
						<h1>Update post</h1>
					</div>
					<form onSubmit={event => handleSubmitUpdatePost(event)}>
						<p className="text-muted"> Update your post!</p>
                        <div className="mb-2"><img src={`http://localhost:3000/${postToUpdate.post._id}.${postToUpdate.post.format}`} className="img-fluid" alt="Responsive image"></img></div>
						<div className="form-group">
							<label htmlFor="captionInput">Caption</label>
							<input
								className="form-control"
								id="captionInput"
								placeholder="Caption"
								readOnly={isLoading}
								ref={caption}
                                defaultValue={postToUpdate.post.caption}
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
                                defaultValue={postToUpdate.post.tags.join(' ')}
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
                                defaultChecked = {postToUpdate.post.visibility !== "all" ? "checked" : ""}
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
								{!isLoading ? 'Update' : 'Updating ...'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

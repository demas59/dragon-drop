import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function UpdatePost() {
	let history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [tagsFormatted, setTagsFormatted] = useState([]);
	const [postToUpdate, setPostToUpdate] = useState(null);


	const caption = useRef();
	const tags = useRef();
	const closeFriends = useRef();

	useEffect(() => {
		if (
			!JSON.parse(localStorage.getItem('connectedUser')) ||
			!JSON.parse(localStorage.getItem('connectedUser')).login
		) {
			history.push(`/login`);
			return;
		}

		setPostToUpdate(JSON.parse(localStorage.getItem("postToUpdate")));
	}, []);

	function handleSubmitUpdatePost(event) {
		setIsLoading(true);
		event.preventDefault();

        const postToSend = {};
        postToSend._id = postToUpdate._id;
        postToSend.caption = caption.current.value;
        if(tagsFormatted.length===0) {
            postToSend.tags = tags.current.value.split(' ');
        }else {
            postToSend.tags = tagsFormatted;
        }
        if (closeFriends.current.checked) {
			postToSend.visibility='hidden';
		} else {
			postToSend.visibility='all';
		}

        
        fetch(`http://localhost:3000/post`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(postToSend)
		}).then(() => {
            setIsLoading(false);
            history.push('/');
			return;
		});

	}

	function handleTagsChange(event) {
		const tagsFormatted = event.target.value.trim().split(' ');
		const tmpArray = tagsFormatted.filter(function (tag) {
			return tag != '';
		});
		setTagsFormatted(tmpArray);
	}


    if (!postToUpdate || !postToUpdate._id) {
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
						<div className="h1">Update post</div>
					</div>
					<form onSubmit={event => handleSubmitUpdatePost(event)}>
						<p className="color-light-blue"> Update your post!</p>
                        <div className="mb-2"><img src={`http://localhost:3000/${postToUpdate._id}.${postToUpdate.format}`} className="img-fluid" alt="Responsive image"></img></div>
						<div className="form-group">
							<label htmlFor="captionInput">Caption</label>
							<input
								className="form-control"
								id="captionInput"
								placeholder="Caption"
								readOnly={isLoading}
								ref={caption}
                                defaultValue={postToUpdate.caption}
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
                                defaultValue={postToUpdate.tags.join(' ')}
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
                                defaultChecked = {postToUpdate.visibility !== "all" ? "checked" : ""}
							></input>
							<label className="form-check-label" htmlFor="visibilityCheckbox">
								Only for close friends
							</label>
						</div>
						<div className="d-flex justify-content-between mt-4">
							<button
								className="btn btn-secondary"
								disabled={isLoading}
								onClick={() => history.push('/')}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-light-blue"
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

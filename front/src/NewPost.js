import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function NewPost() {
    let history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const imageUploaded = useRef();
	
    useEffect(() => {
		if(!localStorage.getItem('username') || localStorage.getItem('username') === "") {
            history.push(`/login`);
        }
	});

    function handleSubmitNewPost(event) {
        event.preventDefault();

        console.log(imageUploaded.current.files[0]);
        let uploadFile = imageUploaded.current.files[0];
        const fileName = imageUploaded.current.files[0].name;

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
                            <input type="file" className="form-control-file" id="imageInput" ref={imageUploaded}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="captionInput">Caption</label>
                            <textarea
                                className="form-control"
                                id="captionInput"
                                placeholder="Caption"
                                readOnly = {isLoading}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tagsInput">Tags</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tagsInput"
                                placeholder="Tag list"
                                readOnly = {isLoading}
                            ></input>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>{!isLoading ? 'Post' : 'Loading...'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
	);
}

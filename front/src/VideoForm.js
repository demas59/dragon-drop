import React, { Component, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function VideoForm(props) {
	const [isLoading, setIsLoading] = useState(false);
	const titleInput = useRef();
	const descriptionInput = useRef();
	const thumbnailInput = useRef();
	let history = useHistory();

	function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		const body = JSON.stringify({
			title: titleInput.current.value,
			description: descriptionInput.current.value,
			thumbnail: thumbnailInput.current.value,
		});
		fetch(`http://localhost:8080/api/videos`, { method: 'POST', body })
			.then(response => response.json())
			.then(({ id }) => history.push(`/videos/${id}`));
	}

	return (
		<form className="videoForm" onSubmit={event => handleSubmit(event)}>
			<label htmlFor="title">Titre</label>
			<input required type="text" id="title" ref={titleInput} />
			<label htmlFor="description">Description</label>
			<textarea
				required
				id="description"
				cols="30"
				rows="10"
				ref={descriptionInput}
			></textarea>
			<label htmlFor="thumbnail">
				Vignette
				<small>
					&nbsp;id de l'image sur &nbsp;
					<a href="https://unsplash.com" target="_blank">
						https://unsplash.com
					</a>
				</small>
			</label>
			<input required type="text" id="thumbnail" ref={thumbnailInput} />
			<button type="submit" disabled={isLoading}>
				{!isLoading ? 'Envoyer' : 'Loading...'}
			</button>
		</form>
	);
}

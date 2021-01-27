import React, { useState } from 'react';

export default function CommentsForm(props) {
	const [content, setContent] = useState(``);
	const [isLoading, setIsLoading] = useState(false);

	function handleInputChange(event) {
		event.preventDefault();
		setContent(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		const newComment = { content: content };
		setIsLoading(true);
		props.onSubmit(newComment).then(() => {
			setIsLoading(false);
			setContent('');
		});
	}

	return (
		<form className="commentForm" onSubmit={handleSubmit}>
			<textarea
				value={content}
				onChange={handleInputChange}
				name="content"
				rows="2"
				disabled={isLoading}
				placeholder="Ajouter un commentaire public"
			/>
			<button type="submit" disabled={isLoading}>
				{!isLoading ? 'Envoyer' : 'Envoi en cours...'}
			</button>
		</form>
	);
}

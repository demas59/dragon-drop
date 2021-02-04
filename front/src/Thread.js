import React from 'react';
import Post from './Post';

export default function Thread() {
	const postToSend = {id: 5, creator: "Tom", likes: 12, dislikes: 8, tags: ["a", "tag1", "tag2", "tag3"], url: "1.jpg", caption: "legende de l'image" };
	return (
		<Post post={postToSend}></Post>
	);
}

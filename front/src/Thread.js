import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function Thread() {
	const [posts, setPosts] = useState(null);

    useEffect(() => {
		fetchPosts();
	}, []);

    function fetchPosts() {
		fetch(`http://localhost:3000/post/id`)
			.then(response => response.json())
			.then(post => setPosts(post));
        // setPosts([5, 4,3,2,1]);
	}

    if (!posts) {
		return (
            <div className="container">
                <div className="col-7 mx-auto p-4">
					<div className="text-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
                </div>
            </div>
        );
	}else if (posts.length === 0) {
		return (
            <div className="container">
                <div className="col-7 mx-auto p-4">
					<div className="text-center">
						Il n'y a aucun post à afficher... :(
					</div>
                </div>
            </div>
        );
	}
	return (
		<div className="mb-4">
			{posts.map(id => {
				return <Post idPost={id}  key={id}></Post>;
			})}
		</div>
	);
}

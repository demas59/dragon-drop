import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function Thread({search}) {
	const [posts, setPosts] = useState(null);
	const [searchedSomething, setSearchedSomething] = useState(false);

    useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		if(!search) {setSearchedSomething(false)}
		else if(search.tag || search.user) {setSearchedSomething(true)}
		else if(search.search) {
			search.user = search.search;
			search.tag = search.search;
			setSearchedSomething(true);
		}else {
			setSearchedSomething(false);
		}
		fetchPosts();
	}, [search]);

	function getIDsFromPosts(posts) {
		return posts.map(post => {
			return post._id;
		})
	}

    function fetchPosts() {
		let postsToDisplay=[];
		if(!searchedSomething) {
			fetch(`http://localhost:3000/post`)
				.then(response => response.json())
				.then(post => setPosts(getIDsFromPosts(post)));
			return;
		}

		if(search.user) {
			fetch(`http://localhost:3000/post/creator/${search.user}`)
			.then(response => response.json())
			.then(postList => {
				
				const postIDList = getIDsFromPosts(postList);
				
				postIDList.forEach(postID => {
					if(postsToDisplay.indexOf(postID) === -1) {
						postsToDisplay.push(postID);
					}
				});

				if(!search.tag) {
					setPosts(postsToDisplay);
				}
			});
		}
		if(search.tag) {
			fetch(`http://localhost:3000/post/tags/${search.tag}`)
			.then(response => response.json())
			.then(postList => {
				
				const postIDList = getIDsFromPosts(postList);
				
				postIDList.forEach(postID => {
					if(postsToDisplay.indexOf(postID) === -1) {
						postsToDisplay.push(postID);
					}
				});
				
				setPosts(postsToDisplay);
			});
		}
	}

	function displayRecapResult() {
		let sentence = "";
		if(!searchedSomething) {
			return "";
		}

		if(search.search) {
			sentence = `Results for search '${search.search}' : ${posts.length} result(s).`;
		}else if(search.tag) {
			sentence = `Results for tag '${search.tag}' : ${posts.length} result(s).`;
		}else if(search.user) {
			sentence = `Results for user '${search.user}' : ${posts.length} result(s).`;
		}

		return (
			<div className="container">
                <div className="col-7 mx-auto p-4">
					<div className="text-center">
						{sentence}
					</div>
				</div>
			</div>
		);
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
						There isn't any post... :(
					</div>
                </div>
            </div>
        );
	}
	return (
		<div className="mb-4">
			{displayRecapResult()}
			{posts.map(id => {
				return <Post idPost={id}  key={id}></Post>;
			})}
		</div>
	);
}

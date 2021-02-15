import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CommentsRenderer from './CommentsRenderer.js';
import LikeButtons from './LikeButtons.js';

export default function Post({idPost}) {
    //get post from id, ici: 5
    const [post, setPost] = useState(null);

    useEffect(() => {
		fetchPost();
	}, []);

    function fetchPost() {
		fetch(`http://localhost:3000/post/${idPost}`)
			.then(response => response.json())
			.then(post => setPost(post));
        // setPost({
        //     id: 1,
        //     creator: "Tom",
        //     tags: ["a", "tag1", "tag2", "tag3"],
        //     caption: "Voici la legende de l'image",
        //     format: "jpg",
        //     comments: [
        //         {
        //             writer: "userName",
        //             value: "commentaire"
        //         }, {
        //             writer: "userName2",
        //             value: "commentaire 2"
        //         }
        //     ],
        //     likes: [
        //         {
        //             username: "username1",
        //             value: 1
        //         }, {
        //             username: "username2",
        //             value: -1
        //         }, {
        //             username: "username2",
        //             value: 1
        //         }, {
        //             username: "username2",
        //             value: 1
        //         }
        //     ]
        // });
	}

    if (!post) {
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
    const {_id, creator, tags, caption, format, comments, likes } = post;
	return (
        <div className="container mt-3">
            <div className="col-7 mx-auto">
                <div className="card p-4">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm h4">
                            {creator}
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1 pr-0 pl-3">
                            <LikeButtons likes={likes} fetchPost={() => fetchPost()} idPost={idPost}></LikeButtons>
                        </div>
                        <div className="col-sm">
                            <img src={`../images/posts/${_id}.${format}`} className="img-fluid" alt="Responsive image"></img>
                        </div>
                        <div className="col-sm-1">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm">
                            {caption}
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm">
                            {tags.map(tag => {
                                return <NavLink to={`/?tag=${tag}`} key={tag} className="mr-2">{"#"+tag}</NavLink>;
                            })}
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm">
                            <CommentsRenderer comments={comments}></CommentsRenderer>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>

                </div>
            </div>
        </div>
	);
}

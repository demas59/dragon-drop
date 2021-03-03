import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CommentsRenderer from './CommentsRenderer.js';
import LikeButtons from './LikeButtons.js';

export default function Post({idPost}) {
	const username = localStorage.getItem('username');
    const [post, setPost] = useState(null);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
		fetchPost();
	}, []);

    function fetchPost() {
		fetch(`http://localhost:3000/post/${idPost}`)
			.then(response => response.json())
			.then(post => setPost(post));
	}

    function handleDeletePost() {
        fetch(`http://localhost:3000/post/${idPost}`, {
            method: 'DELETE'
        }).then(() => {
            setPost(null);
            setDeleted(true);
            return;
        });
    }

    if (!post) {
        if(deleted){
            return "";
        }

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
                        <div className="col-sm text-center">
                            <img src={`http://localhost:3000/${_id}.${format}`} className="img-fluid" alt="Responsive image"></img>
                        </div>
                        <div className="col-sm-1 pl-0 pr-3">
                            {
                                (username && (username.toLocaleLowerCase()===creator.toLocaleLowerCase() || username.toLocaleLowerCase()==="admin")) ?
                                    <div>
                                        <div><img src={`../images/trash.png`} alt="Trash" onClick={() => handleDeletePost()} style={{cursor: 'pointer'}}></img></div>
                                        <div className="mt-2"><img src={`../images/pen.png`} alt="Trash" onClick={() => handleModifyPost()} style={{cursor: 'pointer'}}></img></div>
                                    </div>
                                : ""
                            }
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
                            <CommentsRenderer comments={comments} idPost={idPost} fetchPost={() => fetchPost()}></CommentsRenderer>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>

                </div>
            </div>
        </div>
	);
}

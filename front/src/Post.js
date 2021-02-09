import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Post(idPost) {
    //get post from id, ici: 5
    const [post, setPost] = useState(null);

    useEffect(() => {
		fetchPost();
	}, []);

    function fetchPost() {
		//fetch(`http://localhost:8080/api/post/${idPost}`)
		//	.then(response => response.json())
		//	.then(post => setPost(post));
        setPost({id: 5, creator: "Tom", likes: 12, dislikes: 8, tags: ["a", "tag1", "tag2", "tag3"], url: "1.jpg", caption: "Voici la legende de l'image" });
	}

	function handleLikeClick() {
		//fetch(`http://localhost:8080/api/videos/${id}/likes`, {
		//	method: 'POST',
		//}).then(() => fetchPost());
        console.log("like");
	}
    
	function handleDislikeClick() {
        //fetch(`http://localhost:8080/api/videos/${id}/dislikes`, {
        //	method: 'POST',
        //}).then(() => fetchPost());
        console.log("dislike");
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
    const {id, creator, likes, dislikes, tags, url, caption } = post;
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
                            <div className="w-100 text-center"><img src="../images/arrow-up.png" alt="Arrow up" onClick={() => handleLikeClick()} style={{cursor: 'pointer'}}></img></div>
                            <div className="w-100 text-center">{likes-dislikes}</div>
                            <div className="w-100 text-center"><img src="../images/arrow-down.png" alt="Arrow down" onClick={() => handleDislikeClick()} style={{cursor: 'pointer'}}></img></div>
                        </div>
                        <div className="col-sm">
                            <img src={"../images/"+creator+"/"+url} className="img-fluid" alt="Responsive image"></img>
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
                                return <NavLink to={"/?tag="+tag} class="mr-2">{"#"+tag}</NavLink>;
                            })}
                        </div>
                        <div className="col-sm-1"></div>
                    </div>

                </div>
            </div>
        </div>
        /*<div>
            <div>{id}</div>
            <div>{creator}</div>
            <div>{likes-dislikes}</div>
            <div><ul>{tags.map(element => {
                return <li>{element}</li>
            })}</ul></div>
            <div>{url}</div>
            <div>{caption}</div>
        </div>*/
	);
}

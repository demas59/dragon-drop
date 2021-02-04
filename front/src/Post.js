import React from 'react';

export default function Post({post: {id, creator, likes, dislikes, tags, url, caption } }) {
	return (
        <div className="container">
            <div className="col-7 mx-auto">
                <div className="card p-4">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm">
                            {creator}
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

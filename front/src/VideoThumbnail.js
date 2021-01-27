import React from 'react';
import { Link } from 'react-router-dom';

const VideoThumbnail = ({ video: { title, description, thumbnail, id } }) => (
	<Link to={`/videos/${id}`}>
		<img src={`https://source.unsplash.com/${thumbnail}/600x340`} />
		<section className="infos">
			<h4>{title}</h4>
			<p>{description}</p>
		</section>
	</Link>
);

export default VideoThumbnail;

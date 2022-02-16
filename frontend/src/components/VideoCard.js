import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	.thumb {
		width: 100%;
		height: 180px;
		object-fit: cover;
		box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.video-info-container {
		display: flex;
		margin-top: 0.3rem;
	}

	.channel-avatar img {
		position: relative;
		top: 5px;
	}
	.video-info span {
		font-size: 0.9rem;
		padding-right: 0.1rem;
	}

	@media screen and (max-width: 600px) {
		.thumb {
			height: 250px;
		}
	}

	@media screen and (max-width: 420px) {
		.thumb {
			height: 200px;
		}
	}
`;

const VideoCard = ({ nousername = "", hideavatar = "", video }) => {
	return (
		<Wrapper>
			<img
				className="thumb"
				src={video.thumbnail}
				alt="thumbnail"
			/>
			<div className="video-info-container">
				<div className="video-info">
					<h4>
						{video.title}
					</h4>
						<span className="secondary">
							Michael B. Timmons
						</span>
					<p className="secondary">
					</p>
				</div>
			</div>
		</Wrapper>
	);
};

export default VideoCard;

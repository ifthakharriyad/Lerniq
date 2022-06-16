import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// UI elements
import Player from "../components/Player";
import NoResults from "../components/NoResults";
import Spinner from "../components/Spinner";

// reducers and others
import {
  clearVideo,
  getVideo,
} from "../reducers/video";
import { getRecommendation } from "../reducers/recommendation";

// Icon 
import { LibIcon } from "../components/Icons";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  .video-container{
    width:80%;
    margin: 0 auto;
  }
  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .video-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .video-info-stats {
    display: flex;
    align-items: center;
  }

  .video-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-videos img {
    height: 140px;
  }

  .related-videos div {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-videos {
      display: none;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .video-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const WatchVideo = () => {
  const { videoId } = useParams();
  const { courses } = useSelector((state) => state.recommendation);

  const dispatch = useDispatch();

  const { isFetching: videoFetching, data: video } = useSelector(
    (state) => state.video
  );
  const { isFetching: recommendationFetching } = useSelector(
    (state) => state.recommendation
  );
  
  const enrolledCourse = courses[0]
  const id = enrolledCourse?.id
  
  useEffect(() => {
    dispatch(getVideo(videoId));
    dispatch(getRecommendation());

    return () => {
      dispatch(clearVideo());
    };
  }, [dispatch, videoId]);

  if (videoFetching || recommendationFetching) {
    return <Spinner />;
  }

  if (!videoFetching && !video) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }
  return (
    <Wrapper
    >
      <div className="video-container">
        <div className="video">{!videoFetching && <Player />}</div>

        <div className="video-info">
          <h3>{video.info.title}</h3>

        </div>

        <div className="channel-info-description">
           <div className="channel-info-flex">
            {/* <div className="channel-info flex-row">
              <img
                className="avatar md"
                src={video.User?.avatar}
                alt="channel avatar"
              />
              <div className="channel-info-meta">
                <h4>
                  <Link to={`/channel/${video.userId}`}>
                    {video.User?.username}
                  </Link>
                </h4>
                <span className="secondary small">
                  {video.subscribersCount} subscribers
                </span>
              </div>
            </div> */}
            {/* {!video.isVideoMine && !video.isSubscribed && (
              <Button onClick={() => handleSubscribe({ ...video.User })}>
                Subscribe
              </Button>
            )} */}
            <Link
              to={`/course/${id}`}
            >
              <div>
                <LibIcon />
                <span>Video List</span>
              </div>
            </Link>
          </div> 

          <p>{video.info.description}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default WatchVideo;

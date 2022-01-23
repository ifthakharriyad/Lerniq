import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";

// components
import ChannelTabVideo from "../components/ChannelTabVideo";
import ChannelTabAbout from "../components/ChannelTabAbout";
import Skeleton from "../skeletons/ChannelSkeleton";
import NoResults from "../components/NoResults";


// reducers and utils
import {
  getCourse, clearCourse,
} from '../reducers/course';

const activeTabStyle = {
  borderBottom: "2px solid white",
  color: "white",
};

const Wrapper = styled.div`
  background: ${(props) => props.theme.black};
  min-height: 100vh;
  padding-bottom: 7rem;

  .cover {
    height: 170px;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-tabs {
    padding: 1.2rem 1rem;
    background: ${(props) => props.theme.bg};
  }

  .header {
    width: 80%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }

  .tabs,
  .tab {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 80%;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 2rem;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  li:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 860px) {
    .header,
    .tabs,
    .tab {
      width: 90%;
    }
  }

  @media screen and (max-width: 470px) {
    .header,
    .tabs {
      width: 100%;
    }
  }

`;

const Channel = () => {
  let { courseId } = useParams();

  const dispatch = useDispatch();
  const { id: courseIdFromState } = useSelector((state) => state.course.data);
  const { isFetching, data: course } = useSelector((state) =>  state.course);
  const [tab, setTab] = useState("Modules");
  courseId = courseId || courseIdFromState;

  useEffect(() => {
    dispatch(getCourse(courseId))
    return () => {
        dispatch(clearCourse())
    };
  }, [dispatch, courseId ]);

  if (!isFetching && !course) {
    return (
      <NoResults
        title="Course not found"
        text="The course you are looking for is not found or it may have been removed"
      />
    );
  }

  if (isFetching) {
    return <Skeleton />;
  }
  const {info} = course;
  const {videos} = course
  return (
    <Wrapper >
      <div className="cover">
        <img src={info.cover} alt="channel-cover" />
      </div>

      <div className="header-tabs">
        <div className="header">
          <div className="flex-row">
            <img
              className="avatar lg"
              src={info.avatar}
              alt="channel avatar"
            />
            <div>
              <h3>{info.title}</h3> 
            </div>
          </div>
        </div>

        <div className="tabs">
          <ul className="secondary">
            <li
              style={tab === "Modules" ? activeTabStyle : {}}
              onClick={() => setTab("Modules")}
            >
              Modules
            </li>
            <li
              style={tab === "Course Details" ? activeTabStyle : {}}
              onClick={() => setTab("Course Details")}
            >
              Details
            </li>
          </ul>
        </div>
      </div>

      <div className="tab">
        {tab === "Modules" && <ChannelTabVideo videos={videos} />}
        {tab === "Course Details" && <ChannelTabAbout description={info.description} />}
      </div>
    </Wrapper>
  );
};

export default Channel;

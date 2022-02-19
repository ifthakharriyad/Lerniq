import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  LibIcon,
} from "./Icons";
import { closeSidebar } from "../reducers/sidebar";
import { getRecommendation } from "../reducers/recommendation";


const SidebarWrapper = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: ${(props) => props.theme.bg};
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .icon:not(.hover-disable):hover {
    background: lightgrey;
    cursor: pointer;
  }

  .active div {
    background: lightgrey;
    cursor: pointer;
  }

  // .active svg {
  //   fill: #fff;
  // }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  @media screen and (max-width: 1093px) {
    transform: translateX(-100%);

    ${(props) =>
      props.open &&
      css`
        transform: translateX(0);
      `}
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebar: open } = useSelector((state) => state.sidebar);
	const { courses } = useSelector((state) => state.recommendation);

  const enrolledCourse = courses[0]
  const id = enrolledCourse?.id
  const title = enrolledCourse?.title.slice(0,15) +"..."
  
  useEffect(() => {
		dispatch(getRecommendation());
	}, [dispatch]);
  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <SidebarWrapper open={open}>
      <NavLink
        onClick={handleCloseSidebar}
        exact
        to="/"
        activeClassName="active"
      >
        <div className="icon">
          <HomeIcon />
          <span>Home</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <NavLink
        onClick={handleCloseSidebar}
        to={`/course/${id}`}
        activeClassName="active"
      >
        <div className="icon">
          <LibIcon />
          <span>{title}</span>
        </div>
      </NavLink>

      <div className="ruler"></div>
    </SidebarWrapper>
  );
};

export default Sidebar;

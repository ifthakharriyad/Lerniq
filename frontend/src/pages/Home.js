import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import Skeleton from "../skeletons/HomeSkeleton";
import VideoGrid from "../styles/VideoGrid";
import { getRecommendation } from "../reducers/recommendation";
import Spinner from "../components/Spinner";

export const StyledHome = styled.div`
	position:relative;
	padding: 1.3rem;
	width: 90%;
	margin: 0 auto;
	padding-bottom: 7rem;

	h2 {
		margin-bottom: 1rem;
	}

	@media screen and (max-width: 1093px) {
		width: 95%;
	}

	@media screen and (max-width: 1090px) {
		width: 99%;
	}

	@media screen and (max-width: 870px) {
		width: 90%;
	}

	@media screen and (max-width: 670px) {
		width: 99%;
	}

	@media screen and (max-width: 600px) {
		width: 90%;
	}

	@media screen and (max-width: 530px) {
		width: 100%;
	}
`;

const Home = () => {
	const dispatch = useDispatch();
	const { isFetching, courses } = useSelector(
		(state) => state.recommendation
	);
	useEffect(() => {
		dispatch(getRecommendation());
	}, [dispatch]);

	if (isFetching) {
		return <Spinner/>;
	}

	return (
		<StyledHome>
			<h2>Enrolled Courses</h2>
			<VideoGrid>
				{!isFetching &&
				courses.map((course) => (
						<Link
							key={course.id}
							to={`/course/${course.id}`}
						>
							<VideoCard
								video={course}
							/>
						</Link>
					))}
			</VideoGrid>
		</StyledHome>
	);
};

export default Home;

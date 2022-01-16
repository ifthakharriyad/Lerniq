import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import Skeleton from "../skeletons/HomeSkeleton";
import VideoGrid from "../styles/VideoGrid";
import { getRecommendation } from "../reducers/recommendation";

export const StyledHome = styled.div`
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
	//Sample courses
	// let staticCourses = [
	// 	{
	// 		id: "de64567c-6795-11ec-b1c3-0242ac120002",
	// 		title: "First course",
	// 		description: "This is the first course",
	// 		thumbnail:"https://res.cloudinary.com/dd9ebqpuz/image/upload/v1641574628/adivergather_vqvt06.jpg",
	// 		price: "1",
	// 		createdAt: "2021-12-28T00:00:00.000Z",
	// 	},
	// 	{
	// 		id: "de64567c-6795-11ec-b1c3-0242ac120003",
	// 		title: "Second Course",
	// 		description: "This is the second course",
	// 		thumbnail:"https://res.cloudinary.com/dd9ebqpuz/image/upload/v1641574627/aquacultureo_1_wbnkgb.jpg",
	// 		price: "2",
	// 		createdAt: "2021-12-29T00:00:00.000Z",
	// 	},
	// 	{
	// 		id: "de64567c-6795-11ec-b1c3-0242ac120003",
	// 		title: "Third Course",
	// 		description: "This is the third course",
	// 		thumbnail:"https://scx2.b-cdn.net/gfx/news/2019/in2017global.jpg",
	// 		price: "2",
	// 		createdAt: "2021-12-30T00:00:00.000Z",
	// 	},
	// ];
	useEffect(() => {
		dispatch(getRecommendation());
	}, [dispatch]);

	if (isFetching) {
		return <Skeleton title={true} />;
	}

	return (
		<StyledHome>
			<h2>Recommended Courses</h2>
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

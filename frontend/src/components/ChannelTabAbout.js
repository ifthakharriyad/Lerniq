import React from "react";
import { useSelector } from "react-redux";

const ChannelTabAbout = ({description}) => {
  return <p>{description ? description : "No description for this course"}</p>;
};

export default ChannelTabAbout;

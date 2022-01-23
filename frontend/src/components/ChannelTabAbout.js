import React from "react";

const ChannelTabAbout = ({description}) => {
  return <p>{description ? description : "No description for this course"}</p>;
};

export default ChannelTabAbout;

import React from "react";
import { useSelector } from "react-redux";
import { AzureMP } from 'react-azure-mp'

const Player = () => {
  const data = useSelector(
    (state) => state.video.data
  );
  return (
    <AzureMP
    options={{ controls: true, autoplay: true }}
    src={[{src: data.url[0], type: "application/vnd.ms-sstr+xml" }]}
   />
  );
};

export default Player;

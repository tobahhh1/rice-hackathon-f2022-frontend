import React from "react";
import Map from "../components/map";

const HomePage = (props) => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map />
    </div>
  );
};

export default HomePage;

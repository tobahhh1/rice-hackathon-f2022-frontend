import React, { useEffect, useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { Button } from "@material-ui/core";
import { Router } from "react-router-dom";
import { Link } from "react-router-dom";

const Map = (props) => {
  const [lines, setLines] = useState([]);

  // Fetch lines on mount
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/lines/`, {
        mode: "cors",
      });
      const json = await result.json();
      setLines(json.results);
    };
    fetchData();
  }, []);

  // Render start and end points of each line.

  const features = lines.map((line) => {
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [line.start_lng, line.start_lat],
          [line.end_lng, line.end_lat],
        ],
      },
    };
  });

  const lineGeoJson = {
    type: "FeatureCollection",
    features,
  };

  return (
    <>
      <div
        style={{
          height: "40vh",
          width: "100vw",
          backgroundColor: "",
          marginBottom: "10px",
        }}
      >
        {/** button (in top-right) */}
        <div>
          <Link to="/form">
            <Button variant="outlined">Participate!</Button>
          </Link>
        </div>

        {/** title*/}
        <div style={{ textAlign: "center", width: "95%", margin: "auto" }}>
          <h2>We Bike, We Swear!</h2>

          <h5>
            Houston politicians suck at making bike lanes. Let's change that and
            show them how much we love our bikes.
          </h5>

          <p>
            Each line represents a path that someone would regularly bike if it
            were safe to do so. If there are a lot of lines, there should
            probably be a bike lane. Add a few yourself if you want at the
            button on the top left. The more submissions we get, the more we can
            show our town council how much our bike lanes matter to us.
          </p>
        </div>
        {/** some info text */}
        <div></div>
      </div>
      <ReactMapGL
        mapStyle="mapbox://styles/tobahhh/cl8gh92d3000b14pfu6ffi0v9"
        dragPan={true}
        initialViewState={{
          latitude: 29.7604,
          longitude: -95.3698,
          zoom: 13,
          bearing: 0,
          pitch: 0,
        }}
        style={{
          width: "90vw",
          height: "50vh",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        // onViewportChange={(newViewport) => {
        //   setViewport({ viewport: newViewport });
        // }}
      >
        <Source id="polylineLayer" type="geojson" data={lineGeoJson}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "rgba(255, 0, 0, 0.5)",
              "line-width": 5,
            }}
          />
        </Source>
      </ReactMapGL>
    </>
  );
};
export default Map;

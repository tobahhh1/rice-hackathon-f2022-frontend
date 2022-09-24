import React, { useEffect, useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";

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
          height: "25vh",
          width: "100vw",
          backgroundColor: "yellow",
          marginBottom: "10px",
        }}
      >
        {/** Title, button, info text. */}
      </div>
      <ReactMapGL
        mapStyle="mapbox://styles/tobahhh/cl8gh92d3000b14pfu6ffi0v9"
        dragPan={true}
        initialViewState={{
          latitude: 38.63738602787579,
          longitude: -121.23576311149986,
          zoom: 6.8,
          bearing: 0,
          pitch: 0,
        }}
        style={{
          width: "90vw",
          height: "60vh",
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

import React, { useState, useEffect } from "react";
import { Box, Button, TextField, ListItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

import Chip from "@material-ui/core/Chip";

function FormPage() {
  const [destinations, setDestinations] = useState([]);
  const [residence, setResidence] = useState("");
  const [residenceAutocomplete, setResidenceAutocomplete] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationAutocomplete, setDestinationAutocomplete] = useState([]);
  const [loading, setLoading] = useState(false);

  const maxDestinations = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/form/autocomplete/${encodeURIComponent(residence)}`
      );
      const json = await result.json();
      setResidenceAutocomplete(
        json.results.predictions.map((prediction) => {
          return prediction.description;
        })
      );
    };
    fetchData();
  }, [residence]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/form/autocomplete/${encodeURIComponent(destination)}`
      );
      const json = await result.json();
      setDestinationAutocomplete(
        json.results.predictions.map((prediction) => {
          return prediction.description;
        })
      );
    };
    fetchData();
  }, [destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetch(`${process.env.REACT_APP_API_URL}/form`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        residence,
        destinations,
      }),
    });
    if (result.status === 200) {
      navigate("/");
    } else {
      alert("Error submitting form!");
      setLoading(false);
    }
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleResidence = (e) => {
    setResidence(e.target.value);
  };

  const handleAddDestination = (e, value) => {
    if (value && value !== "") {
      console.log(value);
      const newDestinations = destinations.filter(() => true);
      newDestinations.push(value);
      if (newDestinations.length > maxDestinations) {
        return;
      }
      setDestinations(newDestinations);
    }
  };

  const chips = destinations.map((destination, index) => (
    <ListItem key={index}>
      <Chip
        label={destination}
        onDelete={() => {
          setDestinations((destinations) =>
            destinations.filter((destinationToDelete) => {
              return destinationToDelete !== destination;
            })
          );
        }}
        style={{ margin: "5px" }}
        size="medium"
      />
    </ListItem>
  ));

  return (
    <div className="App">
      <Box margin="10px 10px" textAlign="left">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
      </Box>
      <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
        <h2>Participate</h2>
        <h4>
          Tell us where you live and 5 destinations near you that you either
          bike to regularly or would like to bike to but can't because it's too
          unsafe.
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <Box width={"50%"} margin={"10px auto"}>
          <Autocomplete
            options={residenceAutocomplete}
            onChange={(e, value) => {
              if (value) {
                setResidence(value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                fullWidth
                label="Home Address"
                onChange={handleResidence}
                value={residence}
              />
            )}
          />
        </Box>
        <Box width={"50%"} margin={"10px auto"} display="flex">
          <Box flexGrow="1">
            <Autocomplete
              options={destinationAutocomplete}
              onChange={handleAddDestination}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  fullWidth
                  label="Places You'd Love To Bike"
                  onChange={handleChangeDestination}
                  value={destination}
                />
              )}
            />
          </Box>
          {/* <Box>
            <Button
              disabled={
                destination.length == 0 ||
                destinations.length == maxDestinations
              }
              variant="outlined"
              onClick={handleAddDestination}
            >
              Add
            </Button>
          </Box> */}
        </Box>
        <Box width={"50%"} margin={"10px auto"}>
          {chips}
        </Box>
        <Box marginTop="20px">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={
              destinations.length === 0 || residence === null || loading
            }
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default FormPage;

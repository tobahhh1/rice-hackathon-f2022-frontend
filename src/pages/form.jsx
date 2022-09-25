import React, { useState } from "react";
import { Box } from "@material-ui/core"

import { useRef } from "react";
import Chip  from "@material-ui/core/Chip";
import ChipInput from "material-ui-chip-input";
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
// } from "@chakra-ui/react";
// import { Wrap, WrapItem } from "@chakra-ui/react";

function FormPage(props) {
  const[destinations,setDestinations] = useState([]);
  const [residence, setResidence] = useState(null);
  
  const maxDestinations = 5;
  //Boolean = number < maxDestinations;


  const handleSubmit  = (e) => {
    const newform = new FormData ();
    newform.add('Destinations', destinations);
    e.preventDefault();
    


  }



  const setDestination = (e) => {
    const list = destinations.copy();
    list.add(e.target.value)
    setDestinations(list);


  }



  const handleResidence = (e) => {

    setResidence(e.target.value);


  }

  const deleteDestination = (e) => {
    const list = destinations.copy();
    list.remove(e.target.value)
    setDestinations(list);


  }


  const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
    <Chip
      className={className}
      key={key}
      label={chip}
      onClick={handleClick}
      onDelete={handleDelete}
      size="small"
    />
  );

  let destinationChips = destinations.map((destination, index) => {
    return (
    
        <div>
            <label>
            Destination
            <Chip label = {destination} variant="outlined" onDelete={deleteDestination}>

            </Chip>
            </label>
        </div>
    )
  }
  
  )


    return (
    <div className="App">
    <form onSubmit = {handleSubmit}>
        <Box component="div">
            <label>
                Residence 
                <input type = "text"  onChange = {handleResidence} value = {residence}/>
                
            </label>
          </Box>
          <Box>
            <ChipInput
          chipRenderer={chipRenderer}
          label="Destinations" 
          handleChange = {setDestination}
        />
            {destinationChips}
        </Box>

    <button onClick={handleSubmit} variant="outlined" color="secondary">
      Submit
    </button>
    </form >


    </div>
  );

    }


export default FormPage;

import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { Box } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';



function FormPage(props) {
  const[destinations,setDestinations] = useState([]);
  const [number, setNumber] = useState(0);
  const maxDestinations = 5;


  const handleSubmit  = (e) => {
    const newform = new FormData ();
    formData.append('Destinations', destinations);
    e.preventDefault();


  }

  const handleNext = (e) => {
    if ( number < maxDestinations){
      setDestinations(destinations.add(e.target.value));
      setNumber(number+1);

    }
    else{
      e.preventDefault();
    }
    
    



  }

  const deleteDestination = (e) => {
    setDestinations(destinations.remove(e.target.value));

  }





  return (
    <div className="App">
    <Form onSubmit = {handleSubmit}>
      {
        destinations.map((destination) => 


      )}
      
      


        <Box>
          <label>
          
          <input type = "text" onChange= {handleNext} value = {destination}/>
          </label>
        </Box>
    </Form>
      { % if }
    </div>
  );
}

export default Formpage;

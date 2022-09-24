import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Switch, Route, Form } from "react-router-dom"
import FormPage from './pages/form';

function App(props) {
  return (
    <BrowserRouter>
      <Route path="/form">
        <FormPage />
      </Route>
    </BrowserRouter>
  )
} 

export default App;

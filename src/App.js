import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Form } from "react-router-dom";
import FormPage from "./pages/form";
import HomePage from "./pages/home";

function App(props) {
  return (
    <Routes>
      <Route path="/form" element={<FormPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import LearningManagementSystem from "./containers/LearningManagementSystem/LearningManagementSystem";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <LearningManagementSystem/>
        </div>
      </BrowserRouter>
  );
}

export default App;

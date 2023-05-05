// client/src/App.js

import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

import Helper from './Helper';

var c = console.log

function App() {
  const { helper } = useParams();


  return (
    <div className="App">
      <header className="App-header">
	<Router>
	<Routes>
		<Route path="/:helper" element={<Helper />} />	
	</Routes>
</Router>
      </header>
    </div>
  );
}

export default App;
//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;

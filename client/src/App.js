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

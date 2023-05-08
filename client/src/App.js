// client/src/App.js

import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Login';
import "./App.css";

import Helper from './Helper';

var c = console.log

function App() {

  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

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

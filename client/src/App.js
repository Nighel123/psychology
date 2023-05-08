// client/src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import "./App.css";

import Helper from "./Helper";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <div className="authWrapper">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login setToken={setToken} />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    );
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

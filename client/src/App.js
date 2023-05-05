// client/src/App.js

import React, { useState } from "react";
import "./App.css";
var c = console.log

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [text, setText] = React.useState('You are my brother who loves me. But you never really had time for me.  Me: "Do you love me?" Brother: "Yes I love you! I only always had problems to express my feelings since I never learned how to do that in my childhood!" Me: "Would you like to know how I feel?" ')

  const postText = () => {
	//alert(text);
	
	fetch('/api', {
		method: "POST",
		headers: {
		  'Content-type': 'application/json'
		},
		body: JSON.stringify({text:text})
	})
	.then((response) => response.json())
	.then((result) => {
	  console.log(result)
	}).catch(function() {
        console.log("error");
    	});
  };

  const handleTextInput = e => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
	<textarea rows = "50" cols = "60" name = "description"
		onChange={handleTextInput}
		value={text}
		placeholder="What do you want to ask me?" />
        <button onClick={postText}>
       		 Alert
        </button>
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

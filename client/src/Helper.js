import React from 'react';
import { useParams } from 'react-router-dom'

let c = console.log

export default function Helper() {
  const [data, setData] = React.useState(null);
  const [text, setText] = React.useState("")
  const { helper } = useParams();

  React.useEffect(() => {
    fetch("/" + helper)
      .then((res) => res.json())
      .then((data) => {
	setData(data.heading)
		setText(data.text)
	});
  }, []);

  const postText = () => {
	
	fetch('/ '+ helper, {
		method: "POST",
		headers: {
		  'Content-type': 'application/json'
		},
		body: JSON.stringify({text:text})
	})
	.then((response) => response.json())
	.then((result) => {
	  setText(result.text)
	}).catch(function() {
        console.log("error");
    	});
  };

  const handleTextInput = e => {
    setText(e.target.value);
  };

  return (			
	<div>
	<p>{!data ? "Loading..." : data}</p>
	<textarea rows = "50" cols = "60" name = "description"
		onChange={handleTextInput}
		value={text}
		placeholder="What do you want to ask me?" />
	<button onClick={postText}>
		 Send
	</button>
	</div>
)
}

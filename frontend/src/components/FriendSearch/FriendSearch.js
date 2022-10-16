import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@material-ui/core";
import { currUserAtom } from "../../atoms";
import { useAtom } from "jotai";
 
function FriendSearch() {
  const searchUrl = "http://localhost:4000/users/addFriends/"

  const [user, setUser] = useAtom(currUserAtom);
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState(null);

  let inputHandler = (e) => {
    setInputText(e);
  };

  const handleSubmit = async () =>{
    const response = await fetch(searchUrl, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin' : 'http://localhost:3000'
      },
      body: JSON.stringify({ 
        "username" : user,
        "friend" : "this doesn't work for some reason"
      })
    });

    if (response.status === 400) {
      setResponse("Friend doesn't exist!");
    } else {
      setResponse("Friend added!")
    }
  };

    return (
        <div className="main">
          <h1>Find Friends</h1>
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              onChange={inputHandler}
            />
            {response && <><small style={{ color: 'red' }}>{response}</small><br /></>}<br />
            <Button onClick={handleSubmit}>Add Friend</Button>
          </div>
        </div>
    );
}

export default FriendSearch;


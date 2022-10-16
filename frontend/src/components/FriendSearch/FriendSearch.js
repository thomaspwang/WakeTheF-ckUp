import  React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@material-ui/core";
import { currUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
 
function FriendSearch() {
  const searchUrl = "http://localhost:4000/users/addFriend/"

  const [user, setUser] = useAtom(currUserAtom);
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState(null);
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const endpoint = `http://localhost:4000/users/getFriends/?username=${user}`
    const res = await fetch(endpoint, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin' : 'http://localhost:3000'
      }
    })
    const data = await res.json();
    console.log(data)
    setFriends(data['friends'])
    // ).then(response =>
    //   response.json().then(data => data['friends'])
    //   .then(data => {
    //     setFriends(data)
    //   }))
  }

  useEffect(() => {
    getFriends();
    // console.log(user)
    // console.log(typeof friends)
    console.log(friends)
  }, [])

  let inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(inputText)
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
        "friend" : inputText
      })
    });
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
          <p class="title"> current friends</p>
          <List>
            <>
              {
                friends.map(friend =>
                  <ListItemText primary={friend}/>)
              }
            </>
          </List>
        </div>
    );
}

export default FriendSearch;


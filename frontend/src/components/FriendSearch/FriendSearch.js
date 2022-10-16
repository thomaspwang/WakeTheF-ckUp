import { React, useState } from "react";
import TextField from "@mui/material/TextField";
 
function FriendSearch() {
  const searchUrl = "http://localhost:4000/api/login?"

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
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
            />
          </div>
        </div>
    );
}

export default FriendSearch;


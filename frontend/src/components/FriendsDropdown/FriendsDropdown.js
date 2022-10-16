import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Paper } from "@material-ui/core";
import { useAtom } from 'jotai';
import { currUserAtom } from '../../atoms';
import { useNavigate } from "react-router-dom";
import "./FriendDropdown.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FriendsDropdown() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [user] = useAtom(currUserAtom);
  const [onCall, setOnCall] = React.useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async () =>{
    const response = await fetch("http://localhost:4000/users/setOncall/", {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin' : 'http://localhost:3000'
      },
      body: JSON.stringify({ 
        "username" : user,
        "friends" : personName
      })
    });
    setOnCall(personName);
  };

  const navigateFriends = () => {
    navigate("/friends")
  }

  return (
    <div id="outer-box">
      <div id="inner-box">
        <img id="beepbeep" src={require("../../assets/beepbeep.png")}></img>
        <div class="title" style={{ marginBottom: "15px" }}>add friends to your alarm!</div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">friends</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Friends" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div id="second-box">
        <div id="button-box">
          <Button
            style={{ marginTop: "15px", backgroundColor: "rgba(186,209,250)", fontFamily: "DM SANS", textTransform: "lowercase", color: "black", boxShadow: "none", marginRight: "10px" }}
            id="oncall-button"
            onClick={handleSubmit}
            variant="contained"
          >
            add
          </Button>
          <Button
            style={{ marginTop: "15px", backgroundColor: "rgba(255, 242, 134, .7)", fontFamily: "DM SANS", textTransform: "lowercase", color: "black", boxShadow: "none" }}
            id="oncall-button"
            onClick={navigateFriends}
          >
            find more friends
          </Button>
        </div>
        <div class="title" id="curr-oncall">current oncall friends</div>
        <List style={{ textAlignLast: "center" }}>
          <>
            {
              onCall.map(friend =>
                <ListItemText primary={friend}/>)
            }
          </>
        </List>
      </div>
    </div>
  );
}
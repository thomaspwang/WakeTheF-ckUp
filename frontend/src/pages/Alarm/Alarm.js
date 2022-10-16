import React from "react";
import "./Alarm.css"
import FormAndTimer from "../../components/FormAndTimer/FormAndTimer";
import FriendsDropdown from "../../components/FriendsDropdown/FriendsDropdown.js";

function Alarm() {

    return (
      <div>
        <FormAndTimer />
        <FriendsDropdown />
      </div>

    );
}

export default Alarm;
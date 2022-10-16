import { useState } from "react";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import "./FormAndTimer.css"

const FormAndTimer = (props) => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  const [targetDate, setTargetDate] = useState(
    new Date(dateTimeAfterThreeDays)
  );

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setTargetDate(new Date(event.target.value));
    } else {
      setTargetDate(new Date(dateTimeAfterThreeDays));
    }
  };

  return (
    <>
        <div className="countdown-container">
        
        {/* <p>We'll call you when your alarm goes off! ... if you don't answer though, 
        we'll call each one of your friends one by one, ordered by their proximity. Sleep in and
        you risk losing friends!</p> */}
        <div id="picture-box">
          <img src={require("../../assets/sleebee.png")}></img>
        </div>
        
        <CountdownTimer targetDate={targetDate} />
        <form>
            <label htmlFor="countdown-date-time">
            Select a Date and Time:&nbsp;&nbsp;
            </label>
            <input
            type="datetime-local"
            id="countdown-date-time"
            name="countdown-date-time"
            onChange={handleChange}
            />
        </form>
        </div>
    </>
  );
};

export default FormAndTimer;
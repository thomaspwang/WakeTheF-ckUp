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
        
          <div id="description-box">
            <p id="description">we'll call you when your alarm goes off! buuut, if you don't answer, 
            we'll call each one of your friends one by one, ordered by their proximity. sleep in and
            you risk losing friends!</p>
            <br/>
            <p id="description">(if none of your friends pick up, then we're sure that 911 will :D)</p>
            
          </div>
          
          <div id="picture-box">
            <img id="sleebee" src={require("../../assets/sleebee.png")}></img>
          </div>
          
          <CountdownTimer targetDate={targetDate} />


          <form>
              <label htmlFor="countdown-date-time">
              select a date and time:&nbsp;&nbsp;
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
import React, {useState} from "react";
import "./SignUp.css"
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import { useAtom } from "jotai";
import { currUserAtom } from "../../atoms";

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

function SignUp() {
    const username = useFormInput('');
    const password = useFormInput('');
    const streetName = useFormInput('');
    const state = useFormInput('');
    const city = useFormInput('');
    const phone = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useAtom(currUserAtom);


    const handleSignUp = async () => {
      const response = await fetch("http://localhost:4000/users/newUser/", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin' : 'http://localhost:3000'
        },
        body: JSON.stringify({ 
          "username" : username.value,
          "password" : password.value,
          "address" : streetName.value + state.value + city.value,
          "phone" : phone.value
        })
      });

      console.log(response)
  
      if (response.status === 400) {
        setError("Account already exists! Try logging in.");
      } else {
        setUser(username.value);
        // history('/main');
      }
  
      const responseJson = await response.json();
      console.log(responseJson);
    }


    return (
      <div class="signup">
        <div class="left-half">
          <div class="signup-stuff">
            <div class="text-large">
              create an account
            </div>

            <div class="text-subtitle">
              to never sleep through an alarm again.
            </div>

            <div>
              <div class="form-title">username *</div>

              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                size="small"
                // onChange={handleUsernameChange}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <div class="form-title">password *</div>

              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                size="small"
                // onChange={handlePasswordChange}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <div class="form-title">phone number *</div>

              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                size="small"
                // onChange={handlePasswordChange}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <div class="form-title">address</div>

              <div class="tiny-font" style={{ marginTop: -3 }}>street name *</div>

              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                size="small"
                // onChange={handlePasswordChange}
              />

              <div>
                <div class="tiny-font">city *</div>

                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  size="small"
                  // onChange={handlePasswordChange}
                />
                <div class="tiny-font">state *</div>

                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  size="small"
                  // onChange={handlePasswordChange}
                />
              </div>

              

            </div>

            <br />

            <Button 
              style={{
                backgroundColor: "rgba(186,209,250)", fontFamily: "DM SANS", textTransform: "lowercase", color: "black", boxShadow: "none"
            }}
            variant="contained"
            // disabled={username === "", password === ""}
          >
            sign up
          </Button>

          <a href = "http://localhost:3000" class="form-extra">
            already have an account? login here.
          </a>

          </div>
        </div>
        <div class="right-half">
          <div class="rectangle">
            <img class="tire" src={require("../../assets/blankibee.png")}></img>
          </div>
        </div>
      </div>
        // <div className="signup">
        //     <p className="text-large">wake the f*ck up</p>
        //     <br />
        //     <p className="text-subtitle">never sleep through an alarm again</p>
        //     <div>
        //         <p className="form-title">username</p>
        //         <br />
        //         <input className='inputSignup' type="text" {...username} />
        //     </div>
        //     <div style={{ marginTop: 10 }}>
        //         <p className="form-title">password</p>
        //         <br />
        //         <input className='inputSignup' type="password" {...password} />
        //     </div>
        //     <div style={{ marginTop: 10 }}>
        //         <p className="form-title">street name</p>
        //         <br />
        //         <input className='inputSignup' type="streetName" {...streetName} />
        //     </div>
        //     <div style={{ marginTop: 10 }}>
        //         <p className="form-title">city</p>
        //         <br />
        //         <input className='inputSignup' type="city" {...city} />
        //     </div>
        //     <div style={{ marginTop: 10 }}>
        //         <p className="form-title">state</p>
        //         <br />
        //         <input className='inputSignup' type="state" {...state} />
        //     </div>
        //     <div style={{ marginTop: 10 }}>
        //         <p className="form-title">phone</p>
        //         <br />
        //         <input className='inputSignup' type="phone" {...phone} />
        //     </div>
        //     {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        //     <a href = "http://localhost:3000" className=" dont fucking know">Have an account? Login here.</a>
        //     <br />
        //     <input className='btnLogin' type="button" value={loading ? 'Loading...' : 'Sign Up'} onClick={handleSignUp} disabled={loading} /><br />
        // </div>
    )
}

export default SignUp
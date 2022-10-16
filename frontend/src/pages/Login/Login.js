import { requirePropFactory } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import React, {useState} from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

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

function Login() {
  // const username = useFormInput('');
  // const password = useFormInput('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = e => {
    setPassword(e.target.password);
  }

  const handleUsernameChange = e => {
    setUsername(e.target.username);
  }

  return (
    <div class="login">
      <div class="left-half">
        <div class="login-stuff">
          <div class="text-large">
            wake the f*ck up
          </div>
            
          <div class="text-subtitle">
            using the power of friendship.
          </div>

          <div>
            <div class="form-title">username</div>

            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              onChange={handleUsernameChange}
            />

            {/* <input class='inputLogin' type="text" {...username} autoComplete="new-password" /> */}
          </div>

          <div style={{ marginTop: 10 }}>
            <div class="form-title">password</div>

            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              onChange={handlePasswordChange}
            />

            {/* <input class='inputLogin' type="password" {...password} autoComplete="new-password" /> */}
          </div>

          <br />

          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}

          <Button 
              style={{
                backgroundColor: "rgba(186,209,250)", fontFamily: "DM SANS", textTransform: "lowercase", color: "black", boxShadow: "none"
            }}
            variant="contained"
            // disabled={username === "", password === ""}
          >
            login
          </Button>

          {/* <input class='btnLogin' type="button" value={loading ? 'Loading...' : 'Login'} disabled={loading} /> */}

          <div class="form-extra">
            don't have an account? sign up here.
          </div>
        </div>
      </div>
      <div class="right-half">
        <div class="rectangle">
          <img class="tire" src={require("../../assets/tirealarmbee.png")}></img>
        </div>
      </div>
    </div>
  )
}

export default Login
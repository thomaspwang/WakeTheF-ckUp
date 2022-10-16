import { requirePropFactory } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import React, {useState} from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
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

function Login() {
  // const username = useFormInput('');
  // const password = useFormInput('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAtom(currUserAtom)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {

    const response = await fetch("http://34.168.40.206:4000/users/login/", {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin' : 'http://localhost:3000'
    },
    body: JSON.stringify({ 
      "username" : username,
      "password" : password,
    })
    })

    response.text()
    .then(data => {
        console.log(data)
        if (data == "true") {
            setUser(username)
            navigate("/alarm")
        } else {
            setError("the username or password you submitted is not correct!")
        }
    })
    }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  }

  return (
    <div className="login">
      <div className="left-half">
        <div className="login-stuff">
          <div className="text-large">
            wake the f*ck up
          </div>
            
          <div className="text-subtitle">
            using the power of friendship.
          </div>

          <div>
            <div className="form-title">username</div>

            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              size="small"
              onChange={handleUsernameChange}
            />

            {/* <input class='inputLogin' type="text" {...username} autoComplete="new-password" /> */}
          </div>

          <div style={{ marginTop: 10 }}>
            <div className="form-title">password</div>

            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              size="small"
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
            onClick={handleLogin}
            // disabled={username === "", password === ""}
          >
            login
          </Button>

          {/* <input class='btnLogin' type="button" value={loading ? 'Loading...' : 'Login'} disabled={loading} /> */}

          <div className="form-extra">
            <a href="http://localhost:3000/signup">
                don't have an account? sign up here.
            </a>
          </div>
        </div>
      </div>
      <div className="right-half">
        <div className="rectangle">
          <img className="tire" src={require("../../assets/tirealarmbee.png")}></img>
        </div>
      </div>
    </div>
  )
}

export default Login

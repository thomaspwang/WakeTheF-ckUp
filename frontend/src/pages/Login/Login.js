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
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {

        const response = await fetch("http://localhost:4000/users/login/", {
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
        })
        })

        response.text()
        .then(data => {
            console.log(data)
            if (data == "true") {
                navigate("/alarm")
            } else {
                setError("the username or password you submitted is not correct!")
            }
        })
    }


    return (
        <div className="login">
            <p className="text-large">wake the f*ck up</p>
            <br />
            <p className="text-subtitle">never sleep through an alarm again</p>
            <div>
                <p className="form-title">username</p>
                <br />
                <input className='inputLogin' type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                <p className="form-title">password</p>
                <br />
                <input className='inputLogin' type="password" {...password} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <a href="http://localhost:3000/signup" className=" dont fucking know">don't have an account? sign up here</a>
            <br />
            <input className='btnLogin' type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
    )
}

export default Login
import React, {useState} from "react";
import "./SignUp.css"
import { useAtom } from "jotai";
import { currUserAtom } from "../../atoms";
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

    const navigate = useNavigate();


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
        navigate("/alarm")
      }
  
      const responseJson = await response.json();
      console.log(responseJson);
    }


    return (
        <div className="signup">
            <p className="text-large">wake the f*ck up</p>
            <br />
            <p className="text-subtitle">never sleep through an alarm again</p>
            <div>
                <p className="form-title">username</p>
                <br />
                <input className='inputSignup' type="text" {...username} />
            </div>
            <div style={{ marginTop: 10 }}>
                <p className="form-title">password</p>
                <br />
                <input className='inputSignup' type="password" {...password} />
            </div>
            <div style={{ marginTop: 10 }}>
                <p className="form-title">street name</p>
                <br />
                <input className='inputSignup' type="streetName" {...streetName} />
            </div>
            <div style={{ marginTop: 10 }}>
                <p className="form-title">city</p>
                <br />
                <input className='inputSignup' type="city" {...city} />
            </div>
            <div style={{ marginTop: 10 }}>
                <p className="form-title">state</p>
                <br />
                <input className='inputSignup' type="state" {...state} />
            </div>
            <div style={{ marginTop: 10 }}>
                <p className="form-title">phone</p>
                <br />
                <input className='inputSignup' type="phone" {...phone} />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <a href = "http://localhost:3000" className=" dont fucking know">Have an account? Login here.</a>
            <br />
            <input className='btnLogin' type="button" value={loading ? 'Loading...' : 'Sign Up'} onClick={handleSignUp} disabled={loading} /><br />
        </div>
    )
}

export default SignUp
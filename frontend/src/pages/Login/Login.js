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
  return (
    <div class="login">
      <div class="left-half">
        <div class="login-stuff">
          <div class="text-large">
            wake the f*ck up
          </div>
            
          <div class="text-subtitle">
            never sleep through an alarm again.
          </div>

          <div>
            <div class="form-title">username</div>
            {/* <br /> */}
            <input class='inputLogin' type="text" {...username} autoComplete="new-password" />
          </div>

          <div style={{ marginTop: 10 }}>
            <div class="form-title">password</div>
            {/* <br /> */}
            <input class='inputLogin' type="password" {...password} autoComplete="new-password" />
          </div>

          <br />

          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}

          <input class='btnLogin' type="button" value={loading ? 'Loading...' : 'Login'} disabled={loading} />

          <div class="form-extra">
            don't have an account? sign up here.
          </div>
        </div>
      </div>
      <div class="right-half">
        <div class="rectangle">
          
        </div>
      </div>
    </div>
  )
}

export default Login
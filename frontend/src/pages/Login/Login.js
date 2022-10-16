import React, {useState} from "react";
import "./Login.css"

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
            <p className=" dont fucking know">don't have an account? sign up here</p>
            <input className='btnLogin' type="button" value={loading ? 'Loading...' : 'Login'} disabled={loading} /><br />
        </div>
    )
}

export default Login
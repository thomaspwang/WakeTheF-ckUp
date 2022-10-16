import React, {useState} from "react";
import "./SignUp.css"

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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
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
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <p className=" dont fucking know">Have an account? Login here.</p>
            <input className='btnLogin' type="button" value={loading ? 'Loading...' : 'Sign Up'} disabled={loading} /><br />
        </div>
    )
}

export default SignUp
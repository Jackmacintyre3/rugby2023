import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [login, setLogin] = useState<Login[]>([]);

  useEffect(() => {
    axios.get<Login[]>('http://localhost:3000/Login')
      .then((response) => {
        setLogin(response.data);
      })
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault();

    const foundUser = login.find((user) => user.email === email && user.password === password);

    if (foundUser) 
    {
      setMessage('Login successful!');
    }

    else
    {
      setMessage('Invalid login credentials, try again');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (!json.success) {
      alert('Invalid credentials. Please try again.');
    } else {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <NavBar />
      <div className='container d-flex justify-content-center align-items-center'>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              placeholder='Enter email'
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              placeholder='Password'
            />
          </div>
          <button type='submit' className='btn btn-danger'>
            Submit
          </button>
          <Link to='/createuser' className='btn btn-danger mx-2'>
            New User? Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

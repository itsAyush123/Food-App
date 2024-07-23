import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    if (response.ok) {
      alert("Signup Successful");
    } else {
      alert("Signup failed. Please enter valid credentials.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <NavBar />
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Your Name"
              value={credentials.name}
              onChange={onChange}
              style={{ width: "400px" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              style={{ width: "400px" }}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              style={{ width: "400px" }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              style={{ width: "400px" }}
            />
          </div>

          <div className="d-flex justify-content-start align-items-center" style={{ marginTop: "15px" }}>
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
            <Link to="/login" className="btn btn-danger" style={{ marginLeft: "10px" }}>
              Already a User?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

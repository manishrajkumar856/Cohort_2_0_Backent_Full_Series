import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log("Response: ", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your mail"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account.{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;

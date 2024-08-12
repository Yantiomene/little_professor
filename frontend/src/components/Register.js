import React, { useState } from "react";
import { registerUser } from "../api/api";
import { Link } from "react-router-dom";

const Register = ({ setUserId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(username);
      if (user.error) {
        setError("Username already taken");
      } else {
        setUserId(user.user_id);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;

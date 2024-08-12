import React, { useState } from "react";
import { loginUser } from "../api/api";
import { Link } from "react-router-dom";

const Login = ({ setUserId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(username);
      setUserId(user.user_id);
    } catch (error) {
      setError("Error logging in user");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        Don't yet have an account? <Link to="/">Register</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { loginUser } from "../api/api";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

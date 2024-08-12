import React, { useState } from "react";
import { getUser } from "../api/api";

const Header = ({ userId }) => {
  const [username, setUsername] = useState(null);

  getUser(userId).then((user) => {
    if (!user) {
      return;
    }
    setUsername(user.username);
  });

  return (
    <div>
      <h1>Little Professor Game</h1>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default Header;

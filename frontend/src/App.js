import logo from "./logo1.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <div className="App">
            {!userId ? (
              <Routes>
                <Route path="/" element={<Register setUserId={setUserId} />} />
                <Route
                  path="/login"
                  element={<Login setUserId={setUserId} />}
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/login" element={<Game userId={userId} />} />
              </Routes>
            )}
          </div>
        </Router>
      </header>
    </div>
  );
};

export default App;

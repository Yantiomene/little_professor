import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Routes>
            <Route path="/" element={<Game />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
//components
import CovidDataList from "./components/CovidDataList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Infected from "./components/Infected";
import Tested from "./components/Tested";
import Recovered from "./components/Recovered";
import Footer from "./components/Footer";
import Credits from "./components/Credits";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <div className="logo">
            <Link className="clink" to="/">
              <h1>
                C<span>19</span>Data
              </h1>
            </Link>
          </div>
          <div className="menus">
            <ul>
              <Link className="clink" to="/">
                <li>Home</li>
              </Link>
              <Link className="clink" to="/infected">
                <li>Infected</li>
              </Link>
              <Link className="clink" to="/tested">
                <li>Tested</li>
              </Link>
              <Link className="clink" to="/recovered">
                <li>Recovered</li>
              </Link>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<CovidDataList />} />
          <Route path="/infected" element={<Infected />} />
          <Route path="/tested" element={<Tested />} />
          <Route path="/recovered" element={<Recovered />} />
          <Route path="/about-credits" element={<Credits />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;

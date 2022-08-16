import React from "react";
import logo from "./logo.svg";
import "./App.css";
//components
import CovidDataList from "./components/CovidDataList";

function App() {
  return (
    <>
      <div className="App">
        <CovidDataList />
      </div>
    </>
  );
}

export default App;

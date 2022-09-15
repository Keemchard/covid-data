import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [goToCred, setGoToCred] = useState<boolean>(false);

  const handleClick = () => {
    setGoToCred(!goToCred);
  };

  return (
    <div>
      Developed by <span style={{ fontWeight: "bold" }}>Keemchard🚀</span>{" "}
      {goToCred ? (
        <span
          onClick={() => {
            handleClick();
          }}
        >
          <Link to="/" style={{ color: "#61dafb", fontWeight: "bold" }}>
            Home
          </Link>
        </span>
      ) : (
        <span
          onClick={() => {
            handleClick();
          }}
        >
          <Link
            to="/about-credits"
            style={{ color: "#61dafb", fontWeight: "bold" }}
          >
            Click Me
          </Link>
        </span>
      )}
    </div>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [goToCred, setGoToCred] = useState<boolean>(false);

  return (
    <div>
      Developed by <span style={{ fontWeight: 600 }}>Keemchard</span>{" "}
      {goToCred ? (
        <Link
          to="/"
          onClick={() => setGoToCred(false)}
          style={{ color: "#5b8c5a", fontWeight: 600 }}
        >
          Home
        </Link>
      ) : (
        <Link
          to="/about-credits"
          onClick={() => setGoToCred(true)}
          style={{ color: "#5b8c5a", fontWeight: 600 }}
        >
          Credits
        </Link>
      )}
    </div>
  );
};

export default Footer;

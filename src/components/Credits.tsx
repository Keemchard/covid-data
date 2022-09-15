import React from "react";

const Credits = () => {
  return (
    <div
      style={{
        height: "350px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>
        This Web App was developed by{" "}
        <span style={{ color: "#61dafb", fontWeight: "bold" }}>
          Keemchard D. Tamio
        </span>
        . Created Using React with Typescript and APIs for COVID-19 statistics
        from{" "}
        <a
          style={{
            fontWeight: "bold",
            color: "#61dafb",
          }}
          href="https://apify.com/"
        >
          Apify
        </a>
      </p>
      <p>All Right Reserved 2022</p>
    </div>
  );
};

export default Credits;

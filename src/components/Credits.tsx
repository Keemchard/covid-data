import React from "react";

const Credits = () => {
  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        color: "#2d2a24",
      }}
    >
      <h2 style={{ color: "#2c3e2d", marginBottom: "16px", fontWeight: 600 }}>
        About C19Data
      </h2>
      <p style={{ maxWidth: "520px", lineHeight: 1.7, marginBottom: "12px" }}>
        A COVID-19 statistics tracker built by{" "}
        <span style={{ color: "#2c3e2d", fontWeight: 600 }}>
          Keemchard D. Tamio
        </span>
        . Built with React and TypeScript.
      </p>
      <p style={{ maxWidth: "520px", lineHeight: 1.7, marginBottom: "24px", color: "#6b6459" }}>
        COVID-19 data provided by{" "}
        <a style={{ fontWeight: 600, color: "#5b8c5a" }} href="https://disease.sh/">
          disease.sh
        </a>
        , an open-source API for disease-related statistics.
        Country flags served by{" "}
        <a style={{ fontWeight: 600, color: "#5b8c5a" }} href="https://flagcdn.com/">
          flagcdn.com
        </a>
        .
      </p>
      <p style={{ fontSize: "13px", color: "#a09888" }}>
        Keemchard D. Tamio &middot; 2022–2026
      </p>
    </div>
  );
};

export default Credits;

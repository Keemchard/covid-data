import React from "react";
import "./Card.component.css";

const Card = ({ country, data, iso2 }: any) => {
  const flagSrc = iso2
    ? `https://flagcdn.com/w160/${iso2.toLowerCase()}.png`
    : "";

  return (
    <div className="card">
      {flagSrc ? (
        <img src={flagSrc} alt={country} />
      ) : (
        <div className="flag-placeholder">
          {country.slice(0, 2).toUpperCase()}
        </div>
      )}
      <h2 className="card-country">{country}</h2>
      <p className="card-cases">
        {data != null ? Number(data).toLocaleString() : "N/A"}
      </p>
    </div>
  );
};

export default Card;

import React from "react";
//styles
import "./Card.component.css";

const Card = ({ country, data }: any) => {
  const flagUrl: string = "https://countryflagsapi.com/svg";
  return (
    <>
      <div className="card">
        <img src={`${flagUrl}/${country}`} alt={country} />
        <h1>{country}</h1>
        <div>Cases: {data}</div>
      </div>
    </>
  );
};

export default Card;

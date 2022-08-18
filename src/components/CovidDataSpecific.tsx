import { read } from "fs";
import React, { useEffect, useState } from "react";
//styles
import "./CovidDataSpecific.component.css";

const CovidDataSpecific = ({ covidMoreDataUrl, covidCountryName }: any) => {
  const [covidMoreData, setCovidMoreData] = useState({});

  const getMoreCovidData = async () => {
    const res = await fetch(covidMoreDataUrl);
    const data = await res.json();
    console.log(data);
    setCovidMoreData(data);
  };

  useEffect(() => {
    getMoreCovidData();
  }, []);

  const {
    activeCases,
    ICU,
    deceased,
    infected,
    lastUpdateAtApify,
    readMe,
    recipients,
    stable,
    undercare,
    recovered,
    sourceUrl,
    tested,
  }: any = covidMoreData;

  return (
    <>
      <div className="more-data-con">
        <div className="more-data-head">
          <h1>{covidCountryName}</h1>
        </div>
        <div className="more-data-details">
          <p>{`Active Cases: ${activeCases}`}</p>
          <p>{`ICU: ${ICU}`}</p>
          <p>{`Deceased: ${deceased}`}</p>
          <p>{`Infected: ${infected}`}</p>
          <p>{`Tested: ${tested}`}</p>
          <p>{`Recovered: ${recovered}`}</p>
          <p>{`Recipients: ${recipients}`}</p>
          <p>{`Stable: ${stable}`}</p>
          <p>{`underCare: ${undercare}`}</p>
          <p>{`Latest update time: ${lastUpdateAtApify}`}</p>
          <p>{`Read more: ${readMe}`}</p>
          <p>{`Source Url: ${sourceUrl}`}</p>
        </div>
      </div>
    </>
  );
};

export default CovidDataSpecific;

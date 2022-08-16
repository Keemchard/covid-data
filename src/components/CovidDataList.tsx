import React, { useEffect, useState } from "react";
//styles
import "./CovidDataList.component.css";
import CovidDataSpecific from "./CovidDataSpecific";

const covidDataList = () => {
  const [covidData, setCovidData] = useState([]);
  const [covidMoreDataUrl, setCovidMoreDataUrl] = useState();
  const [covidCountryName, setCovidCountryName] = useState<string>("");

  const apiUrl: string =
    "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";

  const getCovidData = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();

    setCovidData(data);
    console.log(data);
  };

  useEffect(() => {
    getCovidData();
  }, []);

  if (covidCountryName) {
    return (
      <>
        <CovidDataSpecific
          covidMoreDataUrl={covidMoreDataUrl}
          covidCountryName={covidCountryName}
        />
        <button
          onClick={() => {
            setCovidCountryName("");
          }}
        >
          Back
        </button>
      </>
    );
  }

  return (
    <>
      <table className="covid-list-con">
        <tr>
          <th>
            <h1>Country</h1>
          </th>
          <th>
            <h1>Infected</h1>
          </th>
          <th>
            <h1>Tested</h1>
          </th>
          <th>
            <h1>Recovered</h1>
          </th>
          <th>
            <h1>Last Update</h1>
          </th>
        </tr>

        {covidData.map((covid: any) => {
          return (
            <tr key={Math.random()}>
              <td style={{ display: "flex", flexDirection: "column" }}>
                {covid.country}
                <button
                  onClick={() => {
                    setCovidMoreDataUrl(covid.moreData);
                    setCovidCountryName(covid.country);
                  }}
                  style={{ marginTop: "10px", padding: "5px" }}
                >
                  See More
                </button>
              </td>
              <td>{covid.infected}</td>
              <td>{covid.tested}</td>
              <td>{covid.recovered}</td>
              <td>{covid.lastUpdatedApify}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default covidDataList;

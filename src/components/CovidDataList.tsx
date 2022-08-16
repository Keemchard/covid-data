import React, { useEffect, useState } from "react";
//styles
import "./CovidDataList.component.css";

const covidDataList = () => {
  const [covidData, setCovidData] = useState([]);
  const apiUrl: string =
    "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";

  const anotherUrl: string =
    "https://api.apify.com/v2/datasets/jaycEQiGMlb7aOmtI/items?format=json&clean=1";
  const getCovidData = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setCovidData(data);
  };

  useEffect(() => {
    getCovidData();
  }, []);

  return (
    <table className=" covid-list-con">
      <tr>
        <th>Country</th>
        <th>Infected</th>
        <th>Tested</th>
        <th>Recovered</th>
        <th>Last Update TIME</th>
      </tr>

      {covidData.map((covid: any) => {
        return (
          <tr key={Math.random()}>
            <td>{covid.country}</td>
            <td>{covid.infected}</td>
            <td>{covid.tested}</td>
            <td>{covid.recovered}</td>
            <td>{covid.lastUpdatedApify}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default covidDataList;

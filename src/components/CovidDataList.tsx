import React, { useEffect, useState } from "react";
//styles
import "./CovidDataList.component.css";
//components
import CovidDataSpecific from "./CovidDataSpecific";
//router
import { BrowserRouter } from "react-router-dom";

const covidDataList = () => {
  //for search
  const [query, setQuery] = useState("");
  const [searchTerm] = useState(["country"]);

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

  const search = (items: any) => {
    return items.filter((i: any) => {
      return searchTerm.some((newItem: any) => {
        return (
          i[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      });
    });
  };

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
      <BrowserRouter>
        <div className="search-con">
          <input
            className="search-input"
            type="text"
            placeholder="Seatch Country"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <table className="covid-list-con">
            <tr>
              <th>
                <h2>Country</h2>
              </th>
              <th>
                <h2>Infected</h2>
              </th>
              <th>
                <h2>Tested</h2>
              </th>
              <th>
                <h2>Recovered</h2>
              </th>
              <th>
                <h2>Last Update</h2>
              </th>
            </tr>
            {search(covidData).map((covid: any) => {
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
        </div>
      </BrowserRouter>
    </>
  );
};

export default covidDataList;

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

  const flagUrl: string = "https://countryflagsapi.com/svg";

  const getCovidData = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();

    setCovidData(data);
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
          className="see-more back"
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

        <div className="table">
          <table className="covid-list-con">
            <tr>
              <th>
                <h3>Country</h3>
              </th>
              <th>
                <h3>Infected</h3>
              </th>
              <th>
                <h3>Tested</h3>
              </th>
              <th>
                <h3>Recovered</h3>
              </th>
              <th>
                <h3>Last Update</h3>
              </th>
              <th>
                <h3>MoOoOrE</h3>
              </th>
            </tr>
            {search(covidData).map((covid: any) => {
              return (
                <tr key={Math.random()}>
                  <td style={{ display: "flex", flexDirection: "column" }}>
                    <div className="flag-con">
                      <img
                        src={`${flagUrl}/${covid.country.toLowerCase()}`}
                        alt={covid.country}
                        style={{
                          width: "100px",
                          height: "55px",
                          // border: "1px solid black",
                        }}
                      />
                    </div>
                    {covid.country}
                  </td>
                  <td>{covid.infected}</td>
                  <td>{covid.tested}</td>
                  <td>{covid.recovered}</td>
                  <td>{covid.lastUpdatedApify}</td>
                  <td>
                    <button
                      className="see-more"
                      onClick={() => {
                        setCovidMoreDataUrl(covid.moreData);
                        setCovidCountryName(covid.country);
                      }}
                    >
                      See More
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default covidDataList;

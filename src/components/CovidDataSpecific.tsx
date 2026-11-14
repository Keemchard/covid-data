import React, { useEffect, useState } from "react";
import "./CovidDataSpecific.component.css";

const CovidDataSpecific = ({ covidCountryName }: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(covidCountryName)}`
      );
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [covidCountryName]);

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "#6b6459" }}>
        <p>Loading...</p>
      </div>
    );
  }

  const iso = data.countryInfo?.iso2;
  const flagSrc = iso
    ? `https://flagcdn.com/w320/${iso.toLowerCase()}.png`
    : "";

  return (
    <div className="more-main-con">
      <div className="more-data-con">
        <div className="more-data-head">
          {flagSrc && (
            <img
              className="more-data-flag"
              src={flagSrc}
              alt={covidCountryName}
            />
          )}
          <h1>{data.country}</h1>
          <span className="more-data-continent">{data.continent}</span>
        </div>
        <div className="more-data-details">
          <p><span className="detail-label">Cases</span><span>{data.cases?.toLocaleString()}</span></p>
          <p><span className="detail-label">Today Cases</span><span>{data.todayCases?.toLocaleString()}</span></p>
          <p><span className="detail-label">Deaths</span><span>{data.deaths?.toLocaleString()}</span></p>
          <p><span className="detail-label">Today Deaths</span><span>{data.todayDeaths?.toLocaleString()}</span></p>
          <p><span className="detail-label">Recovered</span><span>{data.recovered?.toLocaleString()}</span></p>
          <p><span className="detail-label">Active</span><span>{data.active?.toLocaleString()}</span></p>
          <p><span className="detail-label">Critical</span><span>{data.critical?.toLocaleString()}</span></p>
          <p><span className="detail-label">Tests</span><span>{data.tests?.toLocaleString()}</span></p>
          <p><span className="detail-label">Population</span><span>{data.population?.toLocaleString()}</span></p>
          <p><span className="detail-label">Cases/1M</span><span>{data.casesPerOneMillion?.toLocaleString()}</span></p>
          <p><span className="detail-label">Deaths/1M</span><span>{data.deathsPerOneMillion?.toLocaleString()}</span></p>
          <p><span className="detail-label">Tests/1M</span><span>{data.testsPerOneMillion?.toLocaleString()}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CovidDataSpecific;

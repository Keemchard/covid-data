import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "./CovidDataList.component.css";
import CovidDataSpecific from "./CovidDataSpecific";

const CONTINENTS = ["All", "Asia", "Europe", "Africa", "North America", "South America", "Australia/Oceania"];
const SORT_OPTIONS = [
  { value: "cases", label: "Cases" },
  { value: "deaths", label: "Deaths" },
  { value: "recovered", label: "Recovered" },
  { value: "tests", label: "Tests" },
  { value: "active", label: "Active" },
  { value: "population", label: "Population" },
];
const PAGE_SIZES = [10, 25, 50];

const CovidDataList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [covidData, setCovidData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";
  const continent = searchParams.get("continent") || "All";
  const sortBy = searchParams.get("sort") || "cases";
  const sortDir = (searchParams.get("dir") || "desc") as "desc" | "asc";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = PAGE_SIZES.includes(Number(searchParams.get("size")))
    ? Number(searchParams.get("size"))
    : 25;
  const detail = searchParams.get("detail") || "";

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v && v !== getDefault(k)) next.set(k, v);
      else next.delete(k);
    });
    setSearchParams(next, { replace: true });
  };

  const getDefault = (key: string) => {
    const defaults: Record<string, string> = {
      q: "", continent: "All", sort: "cases", dir: "desc", page: "1", size: "25", detail: "",
    };
    return defaults[key] || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("https://disease.sh/v3/covid-19/countries?sort=cases");
      const data = await res.json();
      setCovidData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = covidData;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((c: any) => c.country.toLowerCase().includes(q));
    }
    if (continent !== "All") {
      result = result.filter((c: any) => c.continent === continent);
    }
    result = [...result].sort((a: any, b: any) => {
      const av = a[sortBy] ?? 0;
      const bv = b[sortBy] ?? 0;
      return sortDir === "desc" ? bv - av : av - bv;
    });
    return result;
  }, [covidData, query, continent, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  if (detail) {
    return (
      <>
        <CovidDataSpecific covidCountryName={detail} />
        <button
          className="see-more back"
          onClick={() => updateParams({ detail: "" })}
        >
          Back
        </button>
      </>
    );
  }

  return (
    <div className="search-con">
      <div className="filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search country..."
          value={query}
          onChange={(e) => updateParams({ q: e.target.value, page: "1" })}
        />
        <div className="filter-controls">
          <label className="filter-group">
            <span className="filter-label">Continent</span>
            <select
              value={continent}
              onChange={(e) => updateParams({ continent: e.target.value, page: "1" })}
              className="filter-select"
            >
              {CONTINENTS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="filter-group">
            <span className="filter-label">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="filter-select"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <button
            className="sort-dir-btn"
            onClick={() => updateParams({ dir: sortDir === "desc" ? "asc" : "desc" })}
            title={sortDir === "desc" ? "Highest first" : "Lowest first"}
          >
            {sortDir === "desc" ? "↓" : "↑"}
          </button>
          <label className="filter-group">
            <span className="filter-label">Per page</span>
            <select
              value={pageSize}
              onChange={(e) => updateParams({ size: e.target.value, page: "1" })}
              className="filter-select"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#6b6459" }}>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="table">
            <table className="covid-list-con">
              <thead>
                <tr>
                  <th><h3>Country</h3></th>
                  <th><h3>Cases</h3></th>
                  <th><h3>Deaths</h3></th>
                  <th><h3>Recovered</h3></th>
                  <th><h3>Active</h3></th>
                  <th><h3>Tests</h3></th>
                  <th><h3>More</h3></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((covid: any) => {
                  const iso = covid.countryInfo?.iso2;
                  const flagSrc = iso
                    ? `https://flagcdn.com/w80/${iso.toLowerCase()}.png`
                    : "";
                  return (
                    <tr key={covid.country}>
                      <td>
                        <div className="flag-con">
                          {flagSrc && (
                            <img
                              src={flagSrc}
                              alt={covid.country}
                              style={{ width: "80px", height: "48px" }}
                            />
                          )}
                        </div>
                        {covid.country}
                      </td>
                      <td>{covid.cases?.toLocaleString()}</td>
                      <td>{covid.deaths?.toLocaleString()}</td>
                      <td>{covid.recovered?.toLocaleString()}</td>
                      <td>{covid.active?.toLocaleString()}</td>
                      <td>{covid.tests?.toLocaleString()}</td>
                      <td>
                        <button
                          className="see-more"
                          onClick={() => updateParams({ detail: covid.country })}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span className="pagination-info">
              {filtered.length > 0
                ? `${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, filtered.length)} of ${filtered.length}`
                : "No results"}
            </span>
            <div className="pagination-buttons">
              <button
                disabled={safePage <= 1}
                onClick={() => updateParams({ page: "1" })}
                className="page-btn"
              >
                First
              </button>
              <button
                disabled={safePage <= 1}
                onClick={() => updateParams({ page: String(safePage - 1) })}
                className="page-btn"
              >
                Prev
              </button>
              <span className="page-indicator">
                {safePage} / {totalPages}
              </span>
              <button
                disabled={safePage >= totalPages}
                onClick={() => updateParams({ page: String(safePage + 1) })}
                className="page-btn"
              >
                Next
              </button>
              <button
                disabled={safePage >= totalPages}
                onClick={() => updateParams({ page: String(totalPages) })}
                className="page-btn"
              >
                Last
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CovidDataList;

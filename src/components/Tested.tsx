import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import "./Infected.component.css";

const CONTINENTS = ["All", "Asia", "Europe", "Africa", "North America", "South America", "Australia/Oceania"];
const PER_PAGE = 24;

const Tested = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";
  const continent = searchParams.get("continent") || "All";
  const sortDir = (searchParams.get("dir") || "desc") as "desc" | "asc";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      const defaults: Record<string, string> = { q: "", continent: "All", dir: "desc", page: "1" };
      if (v && v !== (defaults[k] || "")) next.set(k, v);
      else next.delete(k);
    });
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("https://disease.sh/v3/covid-19/countries?sort=tests");
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = data;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((c: any) => c.country.toLowerCase().includes(q));
    }
    if (continent !== "All") {
      result = result.filter((c: any) => c.continent === continent);
    }
    result = [...result].sort((a: any, b: any) =>
      sortDir === "desc" ? (b.tests ?? 0) - (a.tests ?? 0) : (a.tests ?? 0) - (b.tests ?? 0)
    );
    return result;
  }, [data, query, continent, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "#6b6459" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="case-title">Tested Cases</h1>
      <div className="card-filter-bar">
        <input
          className="card-search"
          type="text"
          placeholder="Search country..."
          value={query}
          onChange={(e) => updateParams({ q: e.target.value, page: "1" })}
        />
        <select
          value={continent}
          onChange={(e) => updateParams({ continent: e.target.value, page: "1" })}
          className="card-select"
        >
          {CONTINENTS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          className="card-sort-btn"
          onClick={() => updateParams({ dir: sortDir === "desc" ? "asc" : "desc" })}
        >
          {sortDir === "desc" ? "↓ High" : "↑ Low"}
        </button>
      </div>
      <div className="main-infected">
        {paginated.map((item: any) => (
          <Card
            key={item.country}
            country={item.country}
            data={item.tests}
            iso2={item.countryInfo?.iso2}
          />
        ))}
      </div>
      <div className="pagination">
        <span className="pagination-info">
          {filtered.length > 0
            ? `${(safePage - 1) * PER_PAGE + 1}–${Math.min(safePage * PER_PAGE, filtered.length)} of ${filtered.length}`
            : "No results"}
        </span>
        <div className="pagination-buttons">
          <button disabled={safePage <= 1} onClick={() => updateParams({ page: "1" })} className="page-btn">First</button>
          <button disabled={safePage <= 1} onClick={() => updateParams({ page: String(safePage - 1) })} className="page-btn">Prev</button>
          <span className="page-indicator">{safePage} / {totalPages}</span>
          <button disabled={safePage >= totalPages} onClick={() => updateParams({ page: String(safePage + 1) })} className="page-btn">Next</button>
          <button disabled={safePage >= totalPages} onClick={() => updateParams({ page: String(totalPages) })} className="page-btn">Last</button>
        </div>
      </div>
    </>
  );
};

export default Tested;

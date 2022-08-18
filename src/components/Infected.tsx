import React, { useEffect, useState } from "react";
//components
import Card from "./Card";
//styles
import "./Infected.component.css";

const Infected = () => {
  const apiUrl: string =
    "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";

  const [infectedData, setInfectedData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();

  const getInfectedData = async () => {
    setLoading(true);
    const res = await fetch(apiUrl);
    const data = await res.json();
    setInfectedData(data);
    setLoading(false);
  };

  useEffect(() => {
    getInfectedData();
  }, []);
  if (loading) {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="case-title">Infected Cases #</h1>
      <div className="main-infected">
        {infectedData.map((items: any) => {
          return (
            <div className="infected-card">
              <Card country={items.country} data={items.infected} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Infected;
